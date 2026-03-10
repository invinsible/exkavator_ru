const dropdownConfigs = [
    {
        id: 'type',
        hasSearch: true,
        options: [
            { name: 'все типы', value: '' },
            { name: 'Раздел тип технки 1', isTitle: true },
            { name: 'Тягачи седельные', value: 'tyagachi' },
            { name: 'Прицепы-тяжеловозы', value: 'pritsepy' },
            { name: 'Терминальные тягачи', value: 'terminal-tyagachi' },
            { name: 'Экскаваторы гусеничные', value: 'excavator-gus' },
            { name: 'Раздел тип технки 2', isTitle: true },
            { name: 'Натяжные машины', value: 'natyazhnye' },
            { name: 'Тип техники 22', value: 'tt22' },
            { name: 'Тип техники 23', value: 'tt23' },
            { name: 'Тип техники 24', value: 'tt34' },
            { name: 'Тип техники 25', value: 'tt222' },
        ]
    },
    {
        id: 'brand',
        hasSearch: true,
        options: [
            { name: 'все марки', value: '' },
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
        id: 'model',
        hasSearch: true,
        options: [
            { name: 'все модели', value: '' },
            { name: 'модель 2', value: 'model-2' },
            { name: 'модель 3', value: 'model-3' },
            { name: 'модель 4', value: 'model-4' },
            { name: 'модель 6', value: 'model-5' },
            { name: 'модель 7', value: 'model-6' },
            { name: 'модель 8', value: 'model-7' },
        ]
    },
    {
        id: 'wear',
        hasSearch: false,
        options: [
            { name: 'Любые', value: '' },
            { name: 'Новые', value: 'new' },
            { name: 'Б/У', value: 'used' },
        ]
    },

];

initPageDropdowns(dropdownConfigs);
initDropdowns('.item-card__show-buttons-wrap');