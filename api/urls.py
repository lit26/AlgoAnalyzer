from django.urls import path
from .views import main_view, StockDataView, SingleStockDataView, StrategyView, NotesDetailView, NotesListView

urlpatterns = [
    path("", main_view),
    path("v1/data", StockDataView.as_view()),
    path(
        "v1/stockdata/ticker=<str:ticker>&timeframe=<str:timeframe>&plotkind=<str:plotkind>",
        SingleStockDataView.as_view(),
    ),
    path("v1/stockdata", SingleStockDataView.as_view()),
    path("v1/strategy/<str:strategy>", StrategyView.as_view()),
    path("v1/notes/", NotesListView.as_view()),
    path("v1/notes/<int:pk>", NotesDetailView.as_view()),
]
