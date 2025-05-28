import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bienvenido a Sistema Angular + WebSocket';
  messages: any[] = [];
  ws!: WebSocket;

  ngOnInit() {
    this.connectWebSocket();
  }


  connectWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    this.ws = new WebSocket(`${protocol}//${host}/ws`);

    this.ws.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };

    this.ws.onmessage = (event) => {
      this.messages.push(JSON.parse(event.data));
    };

    this.ws.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };

    this.ws.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };
  }
}