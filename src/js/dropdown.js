// конфиги дропдаунов для страницы trade-result
// id должно совпадать с id input.field-dropdown__input в разметке
// hasSearch - генерировать инпут с поиском внутри дропдауна
const dropdownConfigs = [
    {
        id: 'customDrop',
        hasSearch: false,
        options: [
            { name: 'Опция 1', value: 'option1'},
            { name: 'Опция 2', value: 'option2'},
            { name: 'Опция 3', value: 'option3'},
        ]
    },
    {
        id: 'type',
        hasSearch: false,
        options: [
            { name: 'Тягачи седельные', value: 'tyagachi' },
            { name: 'Прицепы-тяжеловозы', value: 'pritsepy' },
            { name: 'Терминальные тягачи', value: 'terminal-tyagachi' },
            { name: 'Экскаваторы гусеничные', value: 'excavator-gus' },
            { name: 'Натяжные машины', value: 'natyazhnye' },
        ]
    },
    {
        id: 'brand',
        hasSearch: true,
        options: [
            { name: 'все типы', value: '' },
            { name: 'Землеройная техника', isTitle: true },
            { name: 'Грейдеры', value: 'graders' },
            { name: 'Земснаряды', value: 'zemsnarjady' },
            { name: 'Экскаваторы колесные', value: 'excavator-kol' },
            { name: 'Строительное оборудование', isTitle: true },
            { name: 'оборудование 1', value: 'oborud-1' },
            { name: 'оборудование 2', value: 'oborud-2' },
            { name: 'оборудование 3', value: 'oborud-3' },
        ]
    },
    {
        id: 'availability',
        hasSearch: false,
        options: [
            { name: '100 000', value: '100000' },
            { name: '50 000', value: '50000' },
        ]
    },
    {
        id: 'minPrice',
        hasSearch: false,
        options: [
            { name: '100 000', value: '100000' },
            { name: '50 000', value: '50000' },
        ]
    },
    {
        id: 'maxPrice',
        hasSearch: false,
        options: [
            { name: '40 000', value: '40000' },
            { name: '80 000', value: '80000' },
        ]
    },
];

// debounce
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// фильтрация опций дропдауна по search-инпуту
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
                // перед обработкой нового заголовка — применяем видимость предыдущего
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

        // последний заголовок
        if (currentTitle) {
            currentTitle.style.display = titleHasVisibleOptions ? '' : 'none';
        }
    }, 200);

    searchInput.addEventListener('input', filterOptions);
}

// сброс фильтрации: очистить search и показать все опции
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

// --- инициализация ---

// рендер опций из конфигов (только основной фильтр .filter-block)
const filterBlock = document.querySelector('.filter-block');
if (filterBlock) {
    dropdownConfigs.forEach(function (config) {
        const input = filterBlock.querySelector('#' + config.id);
        if (!input) return;
        const container = input.closest('.field-dropdown');
        if (!container) return;
        renderDropdownOptions(container, config);
    });
}

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

// связь дропдаунов Марка и Модель. Обернул всё в {} чтобы переменные в общий контекст не уходили
{
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
}

// сортировка
initDropdowns('.sorting', {
    onSelect(option, container) {
        const btn = container.querySelector('.button--dropdown');
        if (btn) btn.textContent = option.textContent.trim();
    }
});

