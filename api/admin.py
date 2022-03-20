from django.contrib import admin
from .models import StockData, Notes, SavedStrategies

# Register your models here.
admin.site.register(StockData)
admin.site.register(Notes)
admin.site.register(SavedStrategies)
