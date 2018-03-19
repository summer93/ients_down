from django.shortcuts import render
from rest_framework import viewsets
from pdm.serializers import *


# Create your views here.


class PartViewSet(viewsets.ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer


class DrawingViewSet(viewsets.ModelViewSet):
    queryset = Drawing.objects.all()
    serializer_class = DrawingSerializer
