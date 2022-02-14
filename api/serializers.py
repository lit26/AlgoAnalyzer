from rest_framework import serializers
from .models import StockData


class StockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockData
        fields = ("id", "ticker", "timeframe", "start_time", "end_time", "updated_at")


class SingleStockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockData
        fields = ("ticker", "timeframe")
