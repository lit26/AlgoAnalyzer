from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import views, status
from rest_framework.response import Response
from .serializers import StockDataSerializer, SingleStockDataSerializer
from .models import StockData
from .stock_data.grab_data import *

# Create your views here.
def main_view(request):
    return HttpResponse('<h1>Hello AlgoAnalyzer Api.</h1>')

class StockDataView(views.APIView):
    def get(self, request):
        queryset = StockData.objects.all()
        serializer = StockDataSerializer(queryset, many=True)
        return Response({'history_data': serializer.data}, status=status.HTTP_200_OK)

class SingleStockDataView(views.APIView):
    serializer_class = SingleStockDataSerializer

    def get(self, request, ticker, timeframe):
        df = read_data(ticker, timeframe)
        data_date = df['Date'].values
        data_ohlcv = [df['Open'].values, df['High'].values, df['Low'].values, df['Close'].values, df['Volume'].values]
        data_volume = df['Volume'].values
            
        ticker_data = [[data_date[i], data_ohlcv[0][i], data_ohlcv[1][i], data_ohlcv[2][i], data_ohlcv[3][i]] for i in range(len(data_date))]
        ticker_volume = [[data_date[i], data_volume[i]] for i in range(len(data_date))]
        data = {'data':ticker_data, 'volume': ticker_volume}
        return Response(data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            ticker = serializer.data.get('ticker')
            timeframe = serializer.data.get('timeframe')
            queryset = StockData.objects.filter(ticker=ticker, timeframe=timeframe)
            try:
                if queryset.exists():
                    single_stock_data = queryset[0]
                    starttime, endtime = get_data(ticker, timeframe)
                    single_stock_data.start_time = starttime
                    single_stock_data.end_time = endtime
                    single_stock_data.save()
                    return Response(StockDataSerializer(single_stock_data).data, status=status.HTTP_200_OK)
                else:
                    starttime, endtime = get_data(ticker, timeframe)
                    single_stock_data = StockData(ticker=ticker, timeframe=timeframe, start_time=starttime, end_time=endtime)
                    single_stock_data.save()
                    return Response(StockDataSerializer(single_stock_data).data, status=status.HTTP_201_CREATED)
            except:
                return Response({'Bad Request': 'Fetch data error...'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            ticker = serializer.data.get('ticker')
            timeframe = serializer.data.get('timeframe')
            try:
                queryset = StockData.objects.get(ticker=ticker, timeframe=timeframe)
                queryset.delete()
                delete_data(ticker, timeframe)
                return Response({'Msg': 'Delete successfully'}, status=status.HTTP_200_OK)
            except:
                return Response({'Bad Request': 'Not exist...'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)