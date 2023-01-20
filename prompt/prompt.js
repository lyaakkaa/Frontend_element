


function ask({title, cancel}){
    return new Promise(resolve => {
        const popup = document.createElement('form');

        popup.classList.add('popup');
        popup.classList.add('open');
        popup.insertAdjacentHTML('afterbegin', `
        <fieldset>
        <label>${title}</label>
        <input name="input"/>
        <button type="submit">Submit</button>
        </fieldset>`
        );

        if(cancel){
            const cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.textContent = 'Cancel';

            popup.appendChild(cancelButton);
        }

        popup.addEventListener('submit', e => {
            e.preventDefault();
            const inputValue = e.target.input.value;
            resolve(inputValue);
        });

        document.body.appendChild(popup);

    });
}