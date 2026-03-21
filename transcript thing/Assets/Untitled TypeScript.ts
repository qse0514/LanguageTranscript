@component
export class TranscriptionComponent extends BaseScriptComponent {

  @input('Component.VoiceMLModule') vmlModule: any;
  @input transcriptText: Text;
  @input internetModule: InternetModule;

  private SUPABASE_URL: string = "https://akfpmfnnmhoatqslpvqt.supabase.co";
  private SUPABASE_ANON_KEY: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZnBtZm5ubWhvYXRxc2xwdnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMjQyMjQsImV4cCI6MjA4OTcwMDIyNH0.mS4BgmmGY0YQzN7WNqaEw4PofElpcvDzpi8uqleFxTM";

  onAwake() {
    print("Script started on Spectacles!");

    const pollEvent = this.createEvent("UpdateEvent");
    let lastText = "";
    let ticker = 0;

    pollEvent.bind(() => {
      ticker++;
      if (ticker % 30 !== 0) return;

      const req = RemoteServiceHttpRequest.create();
      req.url = `${this.SUPABASE_URL}/rest/v1/transcript?select=text&limit=1`;
      req.method = RemoteServiceHttpRequest.HttpRequestMethod.Get;
      req.setHeader("apikey", this.SUPABASE_ANON_KEY);
      req.setHeader("Authorization", `Bearer ${this.SUPABASE_ANON_KEY}`);

      this.internetModule.performHttpRequest(req, (response) => {
        const data = JSON.parse(response.body);
        const text = data[0]?.text ?? "";
        if (text !== lastText) {
          lastText = text;
          this.transcriptText.text = text;
        }
      });
    });
  }
}