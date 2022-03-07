from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import views, status
from rest_framework.response import Response
from .serializers import StockDataSerializer, SingleStockDataSerializer
from .models import StockData
from .stock_data.grab_data import *
from .manager import *
from .plot.plot import Stockplot
import json

# Create your views here.
def main_view(request):
    return HttpResponse("<h1>Hello AlgoAnalyzer Api.</h1>")


class StockDataView(views.APIView):
    def get(self, request):
        queryset = StockData.objects.all()
        serializer = StockDataSerializer(queryset, many=True)
        return Response(
            {"history_data": serializer.data, "strategies": STRATEGIES.keys()},
            status=status.HTTP_200_OK,
        )


class SingleStockDataView(views.APIView):
    serializer_class = SingleStockDataSerializer

    def get(self, request, ticker, timeframe):
        df = read_data(ticker, timeframe)
        df["Date"] = pd.to_datetime(df["Date"])
        bfp = Stockplot(ticker, df)
        json_item, p_scale = bfp.get_component()
        plot = {"plotdata": json.dumps(json_item), "pscale": p_scale}
        return Response(plot, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            ticker = serializer.data.get("ticker")
            timeframe = serializer.data.get("timeframe")
            queryset = StockData.objects.filter(ticker=ticker, timeframe=timeframe)
            try:
                if queryset.exists():
                    single_stock_data = queryset[0]
                    starttime, endtime = get_data(ticker, timeframe)
                    single_stock_data.start_time = starttime
                    single_stock_data.end_time = endtime
                    single_stock_data.save()
                    return Response(
                        StockDataSerializer(single_stock_data).data,
                        status=status.HTTP_200_OK,
                    )
                else:
                    starttime, endtime = get_data(ticker, timeframe)
                    single_stock_data = StockData(
                        ticker=ticker,
                        timeframe=timeframe,
                        start_time=starttime,
                        end_time=endtime,
                    )
                    single_stock_data.save()
                    return Response(
                        StockDataSerializer(single_stock_data).data,
                        status=status.HTTP_201_CREATED,
                    )
            except:
                return Response(
                    {"msg": "Fetch data error..."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        return Response({"msg": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            ticker = serializer.data.get("ticker")
            timeframe = serializer.data.get("timeframe")
            try:
                queryset = StockData.objects.get(ticker=ticker, timeframe=timeframe)
                queryset.delete()
                delete_data(ticker, timeframe)
                return Response(
                    {"msg": "Delete successfully"}, status=status.HTTP_200_OK
                )
            except:
                return Response(
                    {"msg": "Not exist..."}, status=status.HTTP_400_BAD_REQUEST
                )
        return Response({"msg": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)


STManager = StrategiesManager()


class StrategyView(views.APIView):
    def get(self, request, strategy):
        params = STManager.get_strategy_detail(strategy)
        if not params:
            return Response(
                {"msg": "Strategy not exist..."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response({"params": params}, status=status.HTTP_200_OK)

    def post(self, request, strategy):
        ticker = request.data["ticker"]
        timeframe = request.data["timeframe"]
        params = request.data["params"]
        sizer = request.data["sizer"]
        cash = request.data["cash"]
        plotkind = request.data["plotkind"]
        if not STManager.get_strategy_detail(strategy):
            return Response(
                {"msg": "Strategy not exist..."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        analysis_result = STManager.run_strategy(
            strategy, ticker, timeframe, plotkind, params, sizer['type'], sizer['amount'], cash
        )
        analysis_result['ticker'] = ticker
        analysis_result['timeframe'] = timeframe
        analysis_result['strategy'] = strategy
        return Response(analysis_result, status=status.HTTP_200_OK)
