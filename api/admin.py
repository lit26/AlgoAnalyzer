from django.contrib import admin
from .models import StockData, Note, SavedStrategy

# Register your models here.
admin.site.register(StockData)
admin.site.register(Note)
admin.site.register(SavedStrategy)
