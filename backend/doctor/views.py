from django.http import HttpResponse

def login(request):
    print(request.body)
    return HttpResponse("hi")
