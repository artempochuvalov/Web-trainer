export const langsModule = {
    state: () => {
        return {
            currentLang: localStorage.getItem('currentLang') || 'ru',
            langsInfo: [
                { name: 'ru' },
                { name: 'en' }
            ],
            system: {
                login_text: {
                    ru: "Войти",
                    en: "Login",
                },
                logout_text: {
                    ru: "Выйти",
                    en: "Logout",
                },
                log_status_text: {
                    ru: "Вы авторизованы",
                    en: "You are logged in",
                },
                network_error_text: {
                    ru: "Ошибка сервера",
                    en: "Network Error",
                },
                network_error_btn: {
                    ru: "Перезагрузить",
                    en: "Reload",
                }
            },
            navMenu: {
                home_text: {
                    ru: "Главная",
                    en: "Home"
                },
                profile_text: {
                    ru: "Профиль",
                    en: "Profile",
                },
                tasks_text: {
                    ru: "Задания",
                    en: "Assignments"
                },
                grades_text: {
                    ru: "Оценки",
                    en: "Grades"
                },
                langs_text: {
                    ru: "Языки",
                    en: "Languages"
                }
            },
            homePage: require('./homePageText'),
            loginPage: {
                login_page_title: {
                    ru: 'Вход в систему',
                    en: 'Login Page'
                },
                login_page_subtitle: {
                    ru: 'Для использования приложения необходима авторизация',
                    en: 'Authorization is required to use the application'
                },
                login_page_btn: {
                    ru: 'Войти через ЕЛК',
                    en: 'Login with ELK'
                }
            },
            page404: {
                page404_subtitle: {
                    ru: 'Что-то пошло не так',
                    en: 'Something went wrong',
                },
                page404_description: {
                    ru: 'Такой страницы больше нет или вы ввели неправильный адрес.',
                    en: 'This page no longer exists or you entered the wrong address.'
                },
                page404_back_btn: {
                    ru: 'Назад',
                    en: 'Back'
                },
                page404_home_btn: {
                    ru: 'Главная',
                    en: 'Home',
                }
            },
            progressPage: {
                progress_page_title: {
                    ru: 'Ведомость',
                    en: 'Grade sheet',
                },
                progress_page_subtitle: {
                    ru: 'Выбор группы',
                    en: 'Group selection',
                },
                progress_page_placeholder: {
                    ru: 'Выберете группу',
                    en: 'Choose the group'
                }
            },
            profilePage: {
                user_works_title: {
                    ru: "Справка о выполненных заданиях",
                    en: "Information about completed tasks",
                },
                achievements_title: {
                    ru: "Полученные навыки",
                    en: "Acquired skills",
                },
                stats_title: {
                    ru: "Статистика успеваемости",
                    en: "Academic performance statistics",
                },
                stats_description: {
                    ru: "Представлены последние 10 оценок",
                    en: "The last 10 grades are presented",
                },
                stats_axis: {
                    ru: "Оценки по десятибалльной шкале",
                    en: "Grades on a ten-point scale"
                },

                ospf_metrics_skill: {
                    ru: "расчёт метрики согласно протоколу OSPF",
                    en: "calculation of metrics according to the OSPF protocol",
                },
                ospf_path_skill: {
                    ru: "нахождение кратчайшего пути между устройствами",
                    en: "finding the shortest path between devices"
                },
                rip_table_skill: {
                    ru: "составление таблицы маршрутизации согласно протоколу RIP",
                    en: "filling the routing table according to the RIP protocol"
                },
                rip_path_skill: {
                    ru: "нахождение кратчайшего пути от маршрутизатора до подсети",
                    en: "finding the shortest path from the router to the subnet",
                },
                stp_root_skill: {
                    ru: "нахождение корневого коммутатора",
                    en: "finding the root switch"
                },
                stp_tree_skill: {
                    ru: "блокирование избыточных соеденений сети",
                    en: "blocking redundant network connections",
                },
            },
            taskUI: {
                task_page_title: {
                    ru: "Задания к семинару",
                    en: "Assignments for the seminar",
                },
                theory_header: {
                    ru: "Теоретическая справка",
                    en: "Theoretical background",
                },
                grade_header: {
                    ru: "Оценка",
                    en: "Grade",
                },
                assignment_header: {
                    ru: "Задание к семинару",
                    en: "Assignment for the seminar",
                },
                start_btn_text: {
                    ru: "Приступить к заданию",
                    en: "Start the assignment"
                },
                send_btn_text: {
                    ru: "Отправить решение",
                    en: "Send solution"
                },
                grade_dialog_title: {
                    ru: "Поздравляем с решением задания!",
                    en: "Congratulations!"
                },
                grade_dialog_your_grade: {
                    ru: "Ваша оценка:",
                    en: "Your grade is",
                },
                grade_dialog_to_profile: {
                    ru: "перейти в профиль",
                    en: "visit profile",
                },
                grade_dialog_to_grade: {
                    ru: "к ведомости",
                    en: "to grades",
                },
                rotate_title: {
                    ru: 'Поверните устройство',
                    en: 'Rotate the devise'
                },
                rotate_subtitle: {
                    ru: 'Задание отображается только в горизонтальной ориентации',
                    en: 'The assignment is only visible in landscape orientation',
                },
                tip_title: {
                    ru: "Подсказка",
                    en: "Tip"
                },
                leave_warn_text: {
                    ru: "Хотите завершить задание? Введенные Вами данные не сохраняться!",
                    en: "Do you want to complete the task? The data you entered is not saved!"
                },
                reset_topology_text: {
                    ru: 'Проблемы с топологией?',
                    en: 'Problems with topology?',
                },
                reset_topology_btn: {
                    ru: 'Сбросить',
                    en: 'Reset'
                }
            },

            tasks: {
                ospf: {
                    main_header: {
                        ru: "Протокол <span>Ospf</span>",
                        en: "Protocol <span>Ospf</span>"
                    },
                    description: {
                        ru: "OSPF — протокол динамической маршрутизации, основанный на технологии отслеживания состояния канала. OSPF был создан как открытый протокол, что сделало его самым распространенным среди протоколов маршрутизации. Открытый протокол маршрутизации не устанавливает отдельных требований к расчету метрик и оценке маршрутов, но его стандарт определяет стоимость каждого соединения. В случае прохождения маршрута через несколько соединений их стоимость суммируется — оптимальным признается маршрут с наименьшей стоимостью.",
                        en: "OSPF is a dynamic routing protocol based on link state tracking technology. OSPF was created as an open protocol, making it the most widely used routing protocol. The open routing protocol does not set separate requirements for calculating metrics and route evaluation, but its standard defines the cost of each connection. If the route passes through several connections, their cost is summed up - the route with the lowest cost is recognized as optimal.",
                    },
                    short_description: {
                        ru: "Расчет метрик сети и нахождение кратчайшего пути между устройствами",
                        en: "Сalculating network metrics and finding the shortest path between devices",
                    },
                    topology_interaction_info: {
                        ru: "Все необходимые метрики указаны прямо на интерактивной топологии, вы можете с ней взаимодействовать и изменять исходные параметры. Для того чтобы изменить пропускную способность соединения, нажмите на него.",
                        en: "All the necessary metrics are indicated directly on the interactive topology, you can interact with it and change the initial parameters. To change the bandwidth of a connection, click on it."
                    },
                    topology_problems: {
                        ru: "Возникли проблемы с топологией?",
                        en: "Having problems with the topology?"
                    },
                    task_text_pieces: {
                        ru: ["Дана топология, необходимо рассчитать метрику всей сети и найти кратчайший путь от устройства", "до устройства", "согласно протоколу OSPF. Относительная пропускная способность сети составляет ", "."],
                        en: ["You have the topology given, it is necessary to calculate the metric of the entire network and find the shortest path from the device", "to the device", "according to the OSPF protocol. The reference bandwidth of the network is", "."],
                    },
                    calc_metric: {
                        ru: "Рассчитайте метрику всей сети",
                        en: "Calculate the metric of the entire network",
                    },
                    enter_path_pieces: {
                        ru: ["Введите кратчайший путь от устройства", "до устройства"],
                        en: ["Enter the shortest path from the device", "to device"],
                    }
                },
                rip: {
                    main_header: {
                        ru: "Протокол <span>Rip</span>",
                        en: "Protocol <span>Rip</span>"
                    },
                    description: {
                        ru: "RIP - это дистанционно-векторный протокол маршрутизации. Он делится информацией о маршруте через локальную трансляцию каждые 30 секунд. В качестве метрики используется количество переходов, которое ограничено максимум 15-ю маршрутизаторами. Маршрутизаторы хранят в таблице маршрутизации только одну информацию о маршруте для одного пункта назначения.",
                        en: " RIP is a distance vector routing protocol. It shares route information via local broadcast every 30 seconds. The metric is hop count, which is limited to a maximum of 15 routers. Routers store only one route information per destination in the routing table.",
                    },
                    short_description: {
                        ru: "Составление таблицы маршрутизации, нахождение кратчайшего пути от маршрутизатора до подсети",
                        en: "Filling the routing table, finding the shortest path from the router to the subnet",
                    },
                    task_text_pieces: {
                        ru: ["Дана топология, состоящая из маршрутизаторов и подсетей. Необходимо рассчитать таблицу маршрутизации для замкнутого маршрутизатора ", ". Найти кратчайший путь от маршрутизатора ", " до подсети ", "."],
                        en: ["You have the topology given, consisting of routers and subnets. It is necessary to calculate the routing table for the closed router ", ". Find the shortest path from router ", " to subnet ", "."]
                    },
                    calc_table: {
                        ru: "Рассчитайте таблицу маршрутизации для маршрутизатора",
                        en: "Calculate the routing table for the router",
                    },
                    enter_path_pieces: {
                        ru: ["Введите кратчайший путь от маршрутизатора", "до подсети"],
                        en: ["Enter the shortest path from the router", "to subnet"],
                    },
                    subnet_text: {
                        ru: "Подсеть",
                        en: "Subnet",
                    },
                    router_text: {
                        ru: "Маршрутизатор",
                        en: "Router",
                    },
                    distance_text: {
                        ru: "Расстояние",
                        en: "Distance",
                    },
                    add_row_text: {
                        ru: "Добавить строку",
                        en: "Add a row",
                    }
                },
                stp: {
                    main_header: {
                        ru: "Протокол <span>Stp</span>",
                        en: "Protocol <span>Stp</span>",
                    },
                    description: {
                        ru: "STP (Spanning Tree Protocol) — сетевой протокол предназначенный для устранения петель в топологии произвольной сети Ethernet. STP программно отключает лишние каналы связи и в итоге создает топологию в виде дерева. STP постоянно отслеживает топологию сети, поэтому при отключении основных каналов связи, STP по возможности переключится на запасные. Поскольку STP создает из коммутаторов топологию в виде дерева, это значит, что в этой топологии есть корень и остальные коммутаторы, которые из него произрастают. Таким образом можно выделить основные принципы работы STP: выбор коммутатора в роли root, блокирование всех лишних каналов связи.",
                        en: "STP (Spanning Tree Protocol) is a network protocol designed to eliminate loops in the topology of an arbitrary Ethernet network. STP programmatically turns off unnecessary communication channels and eventually creates a topology in the form of a tree. STP constantly monitors the topology of the network, so if the main communication channels are disabled, STP will switch to spare ones if possible. Since STP creates a tree topology from switches, this means that this topology has a root and other switches that grow from it. Thus, we can highlight the basic principles of STP operation: choosing a switch as root, blocking all unnecessary communication channels. ",
                    },
                    short_description: {
                        ru: "Расчет дерева STP, нахождение корня, разрывание петель",
                        en: "Calculation of the STP tree, finding the root, breaking loops",
                    },
                    task_text: {
                        ru: "Дана топология, состоящая из коммутаторов. Необходимо найти корневой коммутатор сети, используя данные для каждого коммутатора Priority и MAC-адреса. После этого необходимо отследить петли и отключить лишние связи на интерактивной топологии.",
                        en: "You have the topology given, consisting of switches. You need to find the root switch of the network using the data for each switch Priority and MAC address. After that, you need to trace the loops and disable unnecessary links on the interactive topology."
                    },
                    enter_root: {
                        ru: "Определите корневой коммутатор",
                        en: "Find the root switch"
                    },
                    delete_links: {
                        ru: "На топологии отключите лишние связи",
                        en: "On the topology, disable unnecessary links",
                    },
                    topology_interaction_info: {
                        ru: "Топология является интерактивной, вы можете изменять положение коммутаторов. При наведении курсора на коммутатор, перед вами появляется информация о его Priority и MAC-адресе. Чтобы удалить лишнюю связь — нажмите на неё. В случае удаления неправильной связи, вы можете ее восстановить, нажав на неё",
                        en: "The topology is interactive, you can change the position of the switches. When you hover over the switch, you will see information about its Priority and MAC-address. To remove an extra link, click on it. If a correct link is deleted, you can restore it by clicking on it.",
                    },
                    root_switch: {
                        ru: "корневой коммутатор",
                        en: "root switch",
                    },
                    switches_search_label: {
                        ru: "Метрики коммутаторов",
                        en: "Switches' metrics"
                    },
                    switch_search: {
                        ru: "Поиск по номеру коммутатора",
                        en: "Search by switch number"
                    },
                    switch_search_fail: {
                        ru: "Не найден коммутатор",
                        en: "Switch not found",
                    },
                    delete_link_text: {
                        ru: "Желаете разорвать связь?",
                        en: "Delete the connection?",
                    },
                    restore_link_text: {
                        ru: "Желаете восстановить связь?",
                        en: "Restore the connection?",
                    }
                }
            },

            currentBand: {
                title: {
                    ru: "Информация о текущей оценке",
                    en: "Current grade info",
                },
                current_band_text: {
                    ru: "Текущая оценка:",
                    en: "Current grade:",
                },
                tips_text: {
                    ru: "Подсказки",
                    en: "Tips",
                },
                load_fail_text: {
                    ru: "Не удалось загрузить информацию о текущей оценке",
                    en: "Failed to load grade information"
                },
                profile_link: {
                    ru: "перейти в профиль",
                    en: "visit profile"
                },
                definition: {
                    ru: "Текущая оценка - максимальная оценка, полученная за данный тип задания.",
                    en: "The current grade is the highest grade received for this type of assignment."
                },
                max_band_text: {
                    ru: "Максимальная возможная оценка в зависимости от использования подсказок",
                    en: "Maximum possible band depending on the use of tips"
                }
            }
        }
    },
    getters: {
        sortedLangs: (state) => {
            return [...state.langsInfo].sort(
                (a, b) => {
                    if (a.name === state.currentLang)
                        return -1;
                    else if (b.name === state.currentLang)
                        return 1;
                    else if (a.name > b.name) {
                        return 1;
                    }
                    return -1;
                }
            )
        },

        getSystemText: (state) => (field) => {
            return state.system[field][state.currentLang];
        },
        getNavMenuText: (state) => (field) => {
            return state.navMenu[field][state.currentLang];
        },
        getHomePageText: (state) => (field) => {
            return state.homePage[field][state.currentLang];
        },
        getLoginPageText: (state) => (field) => {
            return state.loginPage[field][state.currentLang];
        },
        getPage404Text: (state) => (field) => {
            return state.page404[field][state.currentLang];
        },
        getPogressPageText: (state) => (field) => {
            return state.progressPage[field][state.currentLang];
        },
        getProfilePageText: (state) => (field) => {
            return state.profilePage[field][state.currentLang];
        },
        getTaskUIText: (state) => (field) => {
            return state.taskUI[field][state.currentLang];
        },
        getTextOfTask: (state) => (work, field) => {
            return state.tasks[work][field][state.currentLang];
        },
        getCurrentBandText: (state) => (field) => {
            return state.currentBand[field][state.currentLang];
        }
    },
    mutations: {
        setLang(state, lang) {
            localStorage.setItem('currentLang', lang);
            state.currentLang = lang;
        }
    },
    namespaced: true
}