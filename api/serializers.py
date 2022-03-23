from rest_framework import serializers
from .models import StockData, Note, SavedStrategy

INTRADAY_TIMEFRAME = [
    "1m",
    "2m",
    "5m",
    "15m",
    "30m",
    "60m",
    "90m",
    "1h",
]

SWING_TIMEFRAME = [
    "1d",
    "5d",
    "1wk",
    "1mo",
    "3mo",
]


class StockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockData
        fields = "__all__"


class StockDataDetailSerializer(serializers.ModelSerializer):
    intraday = serializers.SerializerMethodField("is_intraday")

    class Meta:
        model = StockData
        fields = ("ticker", "timeframe", "intraday")

    def is_intraday(self, data):
        return data.get("timeframe") in INTRADAY_TIMEFRAME

    def validate(self, data):
        timeframe = INTRADAY_TIMEFRAME + SWING_TIMEFRAME
        if data["timeframe"] not in timeframe:
            raise serializers.ValidationError(
                {"msg": f"Invalid timeframe. Timeframe: {timeframe}"}
            )
        return data


class SavedStrategySerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedStrategy
        fields = "__all__"
        extra_kwargs = {
            "created_at": {"required": False},
        }


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"
        extra_kwargs = {
            "created_at": {"required": False},
            "updated_at": {"required": False},
        }
