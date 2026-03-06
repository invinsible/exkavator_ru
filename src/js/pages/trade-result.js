// конфиги дропдаунов для страницы trade-result
// id должно совпадать с id input.field-dropdown__input в разметке
// hasSearch - генерировать инпут с поиском внутри дропдауна
// в конце обязательно вызываем initPageDropdowns
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

initPageDropdowns(dropdownConfigs);