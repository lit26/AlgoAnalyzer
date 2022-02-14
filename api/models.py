from django.db import models

# Create your models here.
class StockData(models.Model):
    ticker = models.CharField(max_length=8)
    timeframe = models.CharField(max_length=3)
    start_time = models.CharField(max_length=20)
    end_time = models.CharField(max_length=20)
    updated_at = models.DateTimeField(auto_now_add=True)
