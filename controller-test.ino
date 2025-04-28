#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "Nama WiFi terhubung";
const char* password = "password_wifi";

AsyncWebServer server(80);
AsyncWebSocket ws("/");

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi..");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
  Serial.println("IP Address: ");
  Serial.println(WiFi.localIP());

  ws.onEvent(onWebSocketEvent);
  server.addHandler(&ws);

  server.begin();
}

void loop() {
}

void onWebSocketEvent(AsyncWebSocket *server, AsyncWebSocketClient *client,
                      AwsEventType type, void *arg, uint8_t *data, size_t len) {
  bool isSerialPrinting;

  if (type == WS_EVT_DATA) {
    if (isSerialPrinting) {
      return;
    }

    isSerialPrinting = true;

    String msg = "";

    for (size_t i = 0; i < len; i++) {
      msg += (char)data[i];
    }

    if (msg.startsWith("LEFT_ANALOG_X")) {
      float lx = getValue(msg, ':', 1).toFloat();
      float ly = getValue(msg, ',', 1).substring(2).toFloat();
      char buffer[100];
      snprintf(buffer, sizeof(buffer), "Left Analog X: %.2f Y: %.2f", lx, ly);
      Serial.println(buffer);
    }
    else if (msg.startsWith("RIGHT_ANALOG_X")) {
      float rx = getValue(msg, ':', 1).toFloat();
      float ry = getValue(msg, ',', 1).substring(2).toFloat();
      char buffer[100];
      snprintf(buffer, sizeof(buffer), "Right Analog X: %.2f Y: %.2f", rx, ry);
      Serial.println(buffer);
    }
    else {
      Serial.print("Button: ");
      Serial.println(msg);
    }

    isSerialPrinting = false;
  }
}

String getValue(String data, char separator, int index) {
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length() - 1;

  for(int i = 0; i <= maxIndex && found <= index; i++){
    if(data.charAt(i) == separator || i == maxIndex){
      found++;
      strIndex[0] = strIndex[1] + 1;
      strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}