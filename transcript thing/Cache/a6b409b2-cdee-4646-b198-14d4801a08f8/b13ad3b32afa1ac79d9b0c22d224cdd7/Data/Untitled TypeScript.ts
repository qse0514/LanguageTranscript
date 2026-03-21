// @input Component.VoiceMLModule vmlModule
// @input Component.Text transcriptText

var options = VoiceML.ListeningOptions.create();
options.speechRecognizer = SpeechRecognizer.Default;

var onUpdateListeningEventHandler = function(eventArgs) {
    var transcript = eventArgs.transcription;
    if (transcript && transcript.length > 0) {
        script.transcriptText.text = transcript;
    }
};

var onListeningErrorHandler = function(eventErrorArgs) {
    print('Error: ' + eventErrorArgs.error + ' desc: ' + eventErrorArgs.description);
};

script.vmlModule.onListeningUpdate.add(onUpdateListeningEventHandler);
script.vmlModule.onListeningError.add(onListeningErrorHandler);

script.vmlModule.startListening(options);