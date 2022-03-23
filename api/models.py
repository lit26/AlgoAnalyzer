from django.db import models
from django.utils.timezone import now

# Create your models here.
class StockData(models.Model):
    ticker = models.CharField(max_length=8)
    timeframe = models.CharField(max_length=3)
    start_time = models.CharField(max_length=20)
    end_time = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_used = models.DateTimeField(default=now)

    class Meta:
        ordering = ["-last_used"]

    def __str__(self):
        return f"{self.ticker}_{self.timeframe}"


class SavedStrategy(models.Model):
    timeframe = models.CharField(max_length=3)
    name = models.CharField(max_length=100, blank=False, default="Unnamed")
    strategy = models.TextField()
    parameters = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
    
    def __str__(self):
        return self.name


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    relate_stock = models.TextField(blank=True)
    relate_strategy = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return self.title
