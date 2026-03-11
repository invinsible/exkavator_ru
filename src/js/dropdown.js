// debounce
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// поиск опций внутри дропдауна
function initDropdownSearch(container) {
    const searchInput = container.querySelector('.dropdown-backdrop__search .field-text__input');
    if (!searchInput) return;

    const filterOptions = debounce(() => {
        const query = searchInput.value.trim().toLowerCase();
        const items = container.querySelectorAll('.dropdown-backdrop__option, .dropdown-backdrop__option-title');

        if (!query) {
            items.forEach(item => item.style.display = '');
            return;
        }

        let currentTitle = null;
        let titleHasVisibleOptions = false;

        items.forEach(item => {
            if (item.classList.contains('dropdown-backdrop__option-title')) {                
                if (currentTitle) {
                    currentTitle.style.display = titleHasVisibleOptions ? '' : 'none';
                }
                currentTitle = item;
                titleHasVisibleOptions = false;
            } else {
                const matches = item.textContent.toLowerCase().includes(query);
                item.style.display = matches ? '' : 'none';
                if (matches) titleHasVisibleOptions = true;
            }
        });
        
        if (currentTitle) {
            currentTitle.style.display = titleHasVisibleOptions ? '' : 'none';
        }
    }, 200);

    searchInput.addEventListener('input', filterOptions);
}

// сброс поиска: очистить search и показать все опции
function resetDropdownSearch(container) {
    const searchInput = container.querySelector('.dropdown-backdrop__search .field-text__input');
    if (!searchInput) return;
    searchInput.value = '';
    container.querySelectorAll('.dropdown-backdrop__option, .dropdown-backdrop__option-title').forEach(item => {
        item.style.display = '';
    });
}

// рендер опций дропдауна из конфига
function renderDropdownOptions(container, config) {
    let backdrop = container.querySelector('.dropdown-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'dropdown-backdrop';
        container.appendChild(backdrop);
    }
    backdrop.innerHTML = '';

    if (config.hasSearch) {
        const searchId = config.id + '-search';
        backdrop.insertAdjacentHTML('beforeend',
            '<div class="dropdown-backdrop__search">' +
                '<div class="field-text field-text--small">' +
                    '<input type="text" class="field-text__input" id="' + searchId + '" placeholder="Поиск">' +
                    '<label for="' + searchId + '" class="field-text__label">' +
                        '<span class="field-text__caption">Поиск</span>' +
                    '</label>' +
                '</div>' +
            '</div>'
        );
    }

    const ul = document.createElement('ul');
    ul.className = 'dropdown-backdrop__list';

    config.options.forEach(function (option) {
        const li = document.createElement('li');
        if (option.isTitle) {
            li.className = 'dropdown-backdrop__option-title';
            li.textContent = option.name;
        } else {
            li.className = 'dropdown-backdrop__option';
            li.textContent = option.name;
            li.dataset.value = option.value;
        }
        ul.appendChild(li);
    });

    backdrop.appendChild(ul);
}

// базовая логика дропдаунов: открытие/закрытие, клик по опции
function initDropdowns(selector, { onSelect, readOnly } = {}) {
    const containers = document.querySelectorAll(selector);
    if (!containers.length) return containers;

    containers.forEach(container => {
        if (readOnly) {
            const input = container.querySelector('input');
            if (input) input.readOnly = true;
        }

        container.addEventListener('click', (e) => {
            if (e.target.closest('.dropdown-backdrop') && !e.target.closest('.dropdown-backdrop__option')) {
                e.stopPropagation();
                return;
            }
            e.stopPropagation();
            containers.forEach(c => { if (c !== container) c.classList.remove('is-open'); });
            container.classList.toggle('is-open');
        });

        container.querySelectorAll('.dropdown-backdrop__option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();                
                container.querySelector('.dropdown-backdrop__option.selected')?.classList.remove('selected');
                option.classList.add('selected');
                container.classList.remove('is-open');
                if (onSelect) onSelect(option, container);
            });
        });
    });

    return containers;
}

// вызывается из скриптов под конкретную страницу после определения конфигов
function initPageDropdowns(dropdownConfigs) {
    // рендер опций из конфигов
    dropdownConfigs.forEach(function (config) {
        const input = document.querySelector('#' + config.id);
        if (!input) return;
        const container = input.closest('.field-dropdown');
        if (!container) return;
        renderDropdownOptions(container, config);

        const currentValue = input.dataset.value;
        if (currentValue) {
            const matchingOption = container.querySelector(
                '.dropdown-backdrop__option[data-value="' + currentValue + '"]'
            );
            if (matchingOption) matchingOption.classList.add('selected');
        }
    });

    // подстановка значений опции
    initDropdowns('.field-dropdown', {
        readOnly: true,
        onSelect(option, container) {
            const input = container.querySelector('input');
            input.value = input.type === 'number'
                ? option.textContent.trim().replace(/\s/g, '')
                : option.textContent.trim();
            input.dataset.value = option.dataset.value || '';
            container.classList.add('selected');
            resetDropdownSearch(container);
        }
    });

    // инициализация поиска внутри дропдаунов
    document.querySelectorAll('.field-dropdown').forEach(initDropdownSearch);

    // связь дропдаунов Марка и Модель
    const brandContainer = document.querySelector('#brand')?.closest('.field-dropdown');
    const modelContainer = document.querySelector('#model')?.closest('.field-dropdown');

    if (brandContainer && modelContainer) {
        const modelInput = modelContainer.querySelector('#model');

        const setModelEnabled = (enabled) => {
            if (enabled) {
                modelContainer.classList.remove('disabled');
                modelInput.disabled = false;
            } else {
                modelContainer.classList.add('disabled');
                modelInput.disabled = true;
                modelInput.value = '';
                modelContainer.classList.remove('selected');
                modelContainer.querySelector('.dropdown-backdrop__option.selected')?.classList.remove('selected');
            }
        };

        brandContainer.querySelectorAll('.dropdown-backdrop__option').forEach(option => {
            option.addEventListener('click', () => setModelEnabled(true));
        });

        setModelEnabled(!!document.querySelector('#brand').value);
    }

    // сортировка
    initDropdowns('.sorting', {
        onSelect(option, container) {
            const btn = container.querySelector('.button--dropdown');
            if (btn) btn.textContent = option.textContent.trim();
        }
    });
}

