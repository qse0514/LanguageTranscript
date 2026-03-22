@component
export class TranscriptionComponent extends BaseScriptComponent {

  @input transcriptText: Text;
  @input internetModule: InternetModule;

  private FIREBASE_URL: string = "https://transcript-exp-default-rtdb.firebaseio.com/transcript.json";

  private opacity: number = 1.0;
  private isFading: boolean = false;
  private isRequesting: boolean = false;
  private lastTimestamp: number = 0;
  private lastInterim: string = "";
  private lastFinal: string = "";
  private fadeDelay: number = 0;
  private readonly FADE_DELAY_FRAMES: number = 120; // ~3 seconds before fade starts

  onAwake() {
    print("Script started on Spectacles!");

    const updateEvent = this.createEvent("UpdateEvent");
    updateEvent.bind(() => {
      if (!this.isFading) return;

      if (this.fadeDelay < this.FADE_DELAY_FRAMES) {
        this.fadeDelay++;
        return;
      }

      this.opacity -= 0.02;
      if (this.opacity < 0) this.opacity = 0;

      const c = this.transcriptText.textFill.color;
      this.transcriptText.textFill.color = new vec4(c.r, c.g, c.b, this.opacity);

      if (this.opacity === 0) {
        this.isFading = false;
        this.fadeDelay = 0;
        this.transcriptText.text = "";
      }
    });

    const pollEvent = this.createEvent("UpdateEvent");
    pollEvent.bind(() => {
      if (this.isRequesting) return;
      this.isRequesting = true;

      const req = RemoteServiceHttpRequest.create();
      req.url = this.FIREBASE_URL;
      req.method = RemoteServiceHttpRequest.HttpRequestMethod.Get;

      this.internetModule.performHttpRequest(req, (response) => {
        this.isRequesting = false;
        try {
          const data = JSON.parse(response.body);
          const newFinal: string = data?.final ?? "";
          const newInterim: string = data?.interim ?? "";
          const newTimestamp: number = data?.timestamp ?? 0;

          if (newTimestamp !== this.lastTimestamp) {
            this.lastTimestamp = newTimestamp;

            if (newFinal !== "" && newFinal !== this.lastFinal) {
              this.lastFinal = newFinal;
              this.lastInterim = "";
              this.transcriptText.text = newFinal;
              this.opacity = 1.0;
              this.fadeDelay = 0;
              const c = this.transcriptText.textFill.color;
              this.transcriptText.textFill.color = new vec4(c.r, c.g, c.b, 1.0);
              this.isFading = true;

            } else if (newInterim !== this.lastInterim) {
              this.lastInterim = newInterim;
              this.lastFinal = "";
              this.isFading = false;
              this.fadeDelay = 0;
              this.transcriptText.text = newInterim;
              this.opacity = 1.0;
              const c = this.transcriptText.textFill.color;
              this.transcriptText.textFill.color = new vec4(c.r, c.g, c.b, 1.0);
            }
          }

        } catch(e) {
          print("Parse error: " + e);
        }
      });
    });
  }
}