window.addEventListener('DOMContentLoaded', () => {
    
 //Hamburger menu for mobile device
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });
    });

 //Modal window 
    const modalTriger = document.querySelector('[data-modal]'),
          applicationTriger = document.querySelectorAll('[data-application]'),
          modal = document.querySelector('.modal'),
          modalApplication = document.querySelector('.application'),
          applicationCloseBtn = document.querySelector('.application__close');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    function openApplication() {
        modalApplication.classList.add('show');
        modalApplication.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }
    function closeApplication() {
        modalApplication.classList.add('hide');
        modalApplication.classList.remove('show');
        document.body.style.overflow = '';
    }
    applicationTriger.forEach(btn => {
        btn.addEventListener('click', openApplication);
    });

    modalTriger.addEventListener('click', openModal);

    applicationCloseBtn.addEventListener('click', closeApplication);
   
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });
    modalApplication.addEventListener('click', (e) => {
        if(e.target === modalApplication || e.target.getAttribute('data-close') == ''){
            closeApplication();
        }
    });
    document.addEventListener('keydown', (e) => {
        if(e.which === 27 && modalApplication.classList.contains('show')) {
            closeApplication();
        }
    });
    document.addEventListener('keydown', (e) => {
        if(e.which === 27 && modal.classList.contains('show')) {
            closeModal();
        }
    });

//Tabs
    const tabs = document.querySelectorAll('.mobile_card'),
          tabsBtn = document.querySelectorAll('.mobile_card_btn'),
          tabsContent = document.querySelectorAll('.mobile_specification'),
          allCity = document.querySelector('.world_all_city'),
          allCityPage = document.querySelector('.world_city_page');

    function showAllCity(active)  {
        allCity.addEventListener(active, ()=> {
            allCityPage.classList.add('show');
        });
    }
    showAllCity('mouseover');
    showAllCity('touchmove');

    function hideAllCity(inactive)  {
        allCity.addEventListener(inactive, ()=> {
            allCityPage.classList.remove('show');
        });
    }
    hideAllCity('mouseout');
    hideAllCity('touchend');

    function changeTabs(n) {
        tabsBtn[n].addEventListener('mouseover',  () =>{
            tabs[n].style.display = 'none';
            tabsContent[n].style.display = 'block';
        });

        tabsBtn[n].addEventListener('mouseout',  () => {
            tabs[n].style.display = 'block';
            tabsContent[n].style.display = 'none';
        });
    }
    changeTabs(0);
    changeTabs(1);
    changeTabs(2);
    changeTabs(3);
    changeTabs(4);
    changeTabs(5);

    // tabs on mobile devise
    function changeTabsOmMobile(n) {
        tabsBtn[n].addEventListener('touchstart',  () =>{
            tabs[n].style.display = 'none';
            tabsContent[n].style.display = 'block';
        });

        tabsBtn[n].addEventListener('touchend',  () => {
            tabs[n].style.display = 'block';
            tabsContent[n].style.display = 'none';
        });
    }
    changeTabsOmMobile(0);
    changeTabsOmMobile(1);
    changeTabsOmMobile(2);
    changeTabsOmMobile(3);
    changeTabsOmMobile(4);
    changeTabsOmMobile(5);

//send forms on server
    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        bindPostData(item);
    });

    const message = {
        loading:  'img/spinner.svg',
        succsess: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        const res = await fetch (url, {
            method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);

            const formData = new FormData(form);

            const object ={};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            const json = JSON.stringify(object);
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.succsess);
                form.reset();
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    

    const prevApplicationDialog = document.querySelector('.application__dialog');

        prevApplicationDialog.classList.add('hide');
        openApplication();

        const thanksApplication = document.createElement('div');
        thanksApplication.classList.add('application__dialog');

        thanksApplication.innerHTML = `
            <div class="application__content">
                <div class="application__close" data close>&times;</div>
                <div class="application__title">${message}</div>
            </div>
        `;

        document.querySelector('.application').append(thanksApplication);
        setTimeout(() => {
            thanksApplication.remove();
            prevApplicationDialog.classList.add('show');
            prevApplicationDialog.classList.remove('hide');
            closeApplication();
        }, 4000);
    }
});