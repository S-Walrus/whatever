const textarea = document.getElementsByTagName('textarea')[0]
const form = document.getElementsByTagName('form')[0]
const messageContainer = document.getElementById('putYourMessageHere');

// makes textarea resizeable
textarea.setAttribute('style', 'height:' + (getScrollHeight(textarea)) + 'px;overflow-y:hidden;');
textarea.addEventListener("input", OnInput, false);

function OnInput() {
    this.style.height = 'auto';
    this.style.height = (getScrollHeight(this)) + 'px';
}

function getScrollHeight(e) {
    
    return e.scrollHeight;
}

function syncMessage() {
    let comment = ''
    console.log('fetching message from server')
    fetch('https://semyon.xyz/stupid/getComment')
    .then(response => response.json())
    .then(data => {
        comment = data['text'];
        messageContainer.textContent = comment;
    })
}

// submit form on enter
function submitOnEnter(event){
    if(event.which === 13 && !event.shiftKey){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
        event.target.value = "";
    }
}

textarea.addEventListener('keypress', submitOnEnter);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let message = textarea.value;
    fetch('https://semyon.xyz/stupid/updateComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: message
      })
      messageContainer.textContent = message;
});

syncMessage();
