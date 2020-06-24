
/**
 * Saving button
 */
const saveButton = document.getElementById('saveButton');

var final_data = {}
var tools =  {
    /**
     * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
     */
    header: {
        class: Header,
        inlineToolbar: ['link'],
        config: {
            placeholder: 'Header'
        },
        shortcut: 'CMD+SHIFT+H'
    },

    /**
     * Or pass class directly without any configuration
     */
    image: SimpleImage,

    list: {
        class: List,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+L'
    },

    checklist: {
        class: Checklist,
        inlineToolbar: true,
    },

    quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
        },
        shortcut: 'CMD+SHIFT+O'
    },

    warning: Warning,

    marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M'
    },

    code: {
        class: CodeTool,
        shortcut: 'CMD+SHIFT+C'
    },

    delimiter: Delimiter,

    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C'
    },

    linkTool: LinkTool,

    embed: Embed,

    table: {
        class: Table,
        inlineToolbar: true,
        shortcut: 'CMD+ALT+T'
    },

}

function getAnswers(){
    id = gup("id")
    if(id==null || id==undefined){
        window.location.replace("/submissions")
    }
    let fetchData = {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('TOKEN')
        },
    }
    fetch(ANSWERS_VIEW + id , fetchData)
        .then(function (res) {
            if (res.status == 200) {
                res.json().then(function (data) {
                    if (data == null) { } else {
                        console.log(data)
                        for(var i=0;i<data.answers.length;i++){
                            html = `<div class="bordered p-3 my-3">
                            <div class="row p-3">
                                <p class="heading d-inline">Question <span>1</span> : ${data.answers[i].question.question}</p>
                            </div>
                            <form class="col s12 mt-n1">
                                <div class="input-field col s12">
                                    <textarea class="browser-default bordered p-2"
                                        disabled>${data.answers[i].answer}</textarea>
                                </div>
                            </form>
                        </div>`
                        $("#questionsContainer").append(html)
                        }
                        for(var i=0;i<data.images.length;i++){
                            var file_url = data.images[i].bolg_file;
                            $("#imagesContainer").append(file_url)
                        }
                        if(data.blog.length>0){
                            final_data = data.blog[0].blog_content
                            procceed()
                        }
                    }
                    return null
                })
            }
            return null
        })
}
function procceed(){
    var editor = new EditorJS({
        holder: 'editorjs',
        tools:tools,
        data: final_data,
        onReady: function () {
            ShowToast("Ready!")
        },
        onChange: function () {
            console.log('something changed');
        }  
    });
    saveButton.addEventListener('click', function () {
        editor.save().then((savedData) => {
            console.log("Saved")
            savedata(savedData)
            console.log(editor.data)
            
        });
    });
}
