const dropdownConfigs = [
    {
        id: 'topic',
        hasSearch: true,
        options: [
            { name: 'все рубрики', value: '' },
            { name: 'Рубрика 1', value: 'topic1' },
            { name: 'Рубрика 2', value: 'topic2' },
            { name: 'Рубрика 3', value: 'topic3' },
            { name: 'Рубрика 5', value: 'topic4' },
        ]
    },
    {
        id: 'category',
        hasSearch: true,
        options: [
            { name: 'все категории', value: '' },
            { name: 'Категория 1', value: 'category1' },
            { name: 'Категория 2', value: 'category2' },
            { name: 'Категория 3', value: 'category3' },
            { name: 'Категория 5', value: 'category4' },
        ]
    },
    {
        id: 'manufacture',
        hasSearch: true,
        options: [
            { name: 'все производители', value: '' },
            { name: 'Производитель 1', value: 'man1' },
            { name: 'Производитель 2', value: 'man2' },
            { name: 'Производитель 3', value: 'man3' },
            { name: 'Производитель 5', value: 'man4' },
        ]
    },
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
        id: 'landlord',
        hasSearch: false,
        options: [
            { name: 'Все арендодатели', value: '' },
            { name: 'Организации', value: 'organization' },
            { name: 'Частные лица', value: 'personal' },
        ]
    },
];

initPageDropdowns(dropdownConfigs);