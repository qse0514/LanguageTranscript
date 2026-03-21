@component
export class TranscriptionComponent extends BaseScriptComponent {

    @input('Component.VoiceMLModule') vmlModule: any;
    @input transcriptText: Text;

    onAwake() {
        const options = VoiceML.ListeningOptions.create();

        this.vmlModule.onListeningUpdate.add((eventArgs) => {
            const transcript = eventArgs.transcription;
            if (transcript && transcript.length > 0) {
                this.transcriptText.text = transcript;
            }
        });

        this.vmlModule.onListeningError.add((eventErrorArgs) => {
            print('Error: ' + eventErrorArgs.error + ' desc: ' + eventErrorArgs.description);
        });

        this.vmlModule.startListening(options);
    }
}