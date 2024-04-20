/* api ocr */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private apiKey = 'K86068849188957';

  constructor(private http: HttpClient) { }

  recognizeImage(imageData: string): Promise<string> {
    const url = `https://api.ocr.space/parse/image`;
    const formData = new FormData();
    formData.append('base64Image', imageData);
    formData.append('apikey', this.apiKey);

    return this.http.post(url, formData).toPromise().then((response: any) => {
      if (response && response.ParsedResults && response.ParsedResults.length > 0) {
        return response.ParsedResults[0].ParsedText;
      } else {
        throw new Error('No se pudo reconocer el texto en la imagen.');
      }
    });
  }
}
