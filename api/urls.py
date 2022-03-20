from django.urls import path
from .views import (
    main_view,
    StockDataView,
    StockDataDetailView,
    StrategyView,
    SavedStrategiesListView,
    SavedStrategiesDetailView,
    NotesDetailView,
    NotesListView,
)

urlpatterns = [
    path("", main_view),
    path("v1/data", StockDataView.as_view()),
    path(
        "v1/stockdata/ticker=<str:ticker>&timeframe=<str:timeframe>&plotkind=<str:plotkind>",
        StockDataDetailView.as_view(),
    ),
    path("v1/stockdata", StockDataDetailView.as_view()),
    path("v1/strategy/<str:strategy>", StrategyView.as_view()),
    path("v1/savedstrategy", SavedStrategiesListView.as_view()),
    path("v1/savedstrategy/<int:strategy_id>", SavedStrategiesDetailView.as_view()),
    path("v1/notes/", NotesListView.as_view()),
    path("v1/notes/<int:pk>", NotesDetailView.as_view()),
]
