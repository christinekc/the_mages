from flask import Flask, request, redirect
import time
import twilio.twiml

app = Flask(__name__)

lat = 0
lon = 0

@app.route("/", methods=['GET', 'POST'])
def hello_monkey():
	resp = twilio.twiml.Response()
	if request.values.get('From', None) == None:
		lat = request.values.get('lat', 0)
		lon = request.values.get('lon', 0)
		return None
	elif request.values.get('From', None) == "6475153544":
		if request.values.get('speed', None) == None
			resp.message("Your car is located here:" +
				" https://www.google.ca/maps/@" +
				lat + "," + lon + ",15z")
		else:
			resp.message("" + request.values.get('user', None) +
				" is driving at " +
				request.values.get('speed', None) + " km/h.")
		return str(resp)

if __name__ == "__main__":
	app.run(debug=True)