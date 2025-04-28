# Virtual Joystick Simulator

Virtual Joystick Simulator memudahkan user dalam menggunakan perangkat mobile sebagai pengganti joystick/controller dengan menggunakan Teknologi Web dan ESP32 sebagai server.

## Cara Penggunaan

1. Clone atau Fork Repositori ini
    ```
    git clone https://github.com/rifqiraehan/virtual-joystick-simulator.git
    ```
2. Masuk ke direktori project
    ```
    cd virtual-joystick-simulator
    ```
3. Install Extension `Live Server` pada VS Code
4. Masuk ke file `index.html`. Lalu, klik kanan pada bagian blok kode. Pilih `Open with Live Server`. Perhatikan Port yang ditampilkan pada notifikasi pada kanan bawah atau pada URL browser.
5. Buka terminal dan jalankan perintah `ipconfig`. Lalu, salin alamat IPv4.
6. Tempel alamat IPv4 tersebut pada perangkat mobile dan diikuti dengan port `Contoh: 172.0.0.1:8000`.
7. Pada Arduino IDE, Install 2 Library berikut:
    -   [ESPAsyncWebServer](https://github.com/ESP32Async/ESPAsyncWebServer)
    - [AsyncTCP](https://github.com/ESP32Async/AsyncTCP)
8. Buat `New Project` pada Arduino IDE, salin dan tempel kode `controller-test.ino`.
9. Ubah alamat web socket pada `script.js` menggunakan alamat yang muncul pada serial monitor di Arduino IDE.

Jika Anda merasa proyek ini bermanfaat, harap beri bintang ⭐ pada repositori ini sebagai bentuk apresiasi. Anda juga dapat berkontribusi untuk mengembangkan proyek ini lebih lanjut dengan membuka **Issue**, memberikan saran, atau membuat **Pull Request**.

Kami sangat menghargai setiap kontribusi yang dapat meningkatkan kualitas dan fungsionalitas aplikasi ini. Terima kasih atas dukungan Anda!