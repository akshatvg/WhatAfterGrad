/**
 * Saving button
 */
const saveButton = document.getElementById('saveButton');

var final_data = {}
var tools = {
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

function getAnswers() {
    id = gup("id")
    if (id == null || id == undefined) {
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
    fetch(ANSWERS_VIEW + id, fetchData)
        .then(function(res) {
            if (res.status == 200) {
                res.json().then(function(data) {
                    if (data == null) {} else {
                        // console.log(data)
                        for (var i = 0; i < data.answers.length; i++) {
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
                        for (var i = 0; i < data.images.length; i++) {
                            var file_url = data.images[i].bolg_file;
                            $("#imagesContainer").append(file_url + " <button type='button' onclick='copyText(\"" + file_url + "\")' class='waves-effect waves-light btn-wag-black'><i class='material-icons'>content_paste</i></button>" + " <a href='" + file_url + "' target='_blank'><button type='button' class='waves-effect waves-light btn-wag-black'><i class='material-icons'>remove_red_eye</i></button></a>")
                        }
                        if (data.blog.length > 0) {
                            final_data = data.blog[0].blog_content
                            console.log(final_data)
                        } else {
                            final_data = {
                                "time": 1593442726879,
                                "blocks": [{
                                        "type": "header",
                                        "data": {
                                            "text": "Blog Title",
                                            "level": 2
                                        }
                                    },
                                    {
                                        "type": "paragraph",
                                        "data": {
                                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                        }
                                    },
                                    {
                                        "type": "image",
                                        "data": {
                                            "file": {
                                                "url": "/upload/redactor_images/o_f46949ac399275cd7db44f099e380aa8.jpg",
                                                "width": 960,
                                                "height": 640
                                            },
                                            "caption": "Test Picture",
                                            "withBorder": false,
                                            "stretched": false,
                                            "withBackground": false
                                        }
                                    },
                                    {
                                        "type": "image",
                                        "data": {
                                            "file": {
                                                "url": "/upload/temporary/o_ab055c85c7157c0339737603d42be47d.jpg",
                                                "width": 735,
                                                "height": 684
                                            },
                                            "caption": "Test Picture 2",
                                            "withBorder": false,
                                            "stretched": false,
                                            "withBackground": false
                                        }
                                    },
                                    {
                                        "type": "list",
                                        "data": {
                                            "style": "ordered",
                                            "items": [
                                                "List",
                                                "List 2"
                                            ]
                                        }
                                    },
                                    {
                                        "type": "code",
                                        "data": {
                                            "code": "JavaScript"
                                        }
                                    },
                                    {
                                        "type": "quote",
                                        "data": {
                                            "text": "This is a quote",
                                            "caption": "by Akshat Gupta",
                                            "alignment": "left"
                                        }
                                    },
                                    {
                                        "type": "delimiter",
                                        "data": {}
                                    },
                                    {
                                        "type": "table",
                                        "data": {
                                            "content": [
                                                [
                                                    "Table heading",
                                                    "Table heading"
                                                ],
                                                [
                                                    "Table data",
                                                    "Table data"
                                                ]
                                            ]
                                        }
                                    },

                                ],
                                "version": "2.18.0"
                            }
                        }
                        procceed(final_data)
                    }
                    return null
                })
            }
            return null
        })
}

function copyText(file_url) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(file_url).select();
    document.execCommand("copy");
    $temp.remove();
}

function procceed(final_data) {
    var editor = new EditorJS({
        holder: 'editorjs',
        tools: tools,
        data: final_data,
        onReady: function() {
            ShowToast("Ready to publish?")
        },
        onChange: function() {
            // console.log('something changed');
        }
    });
    saveButton.addEventListener('click', function() {
        editor.save().then((savedData) => {
            // console.log("Saved")
            savedata(savedData)
            console.log(savedData)

        });
    });
}

// console.clear();