              
              <!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Модальное окно на чистом CSS</title>
  <style>
    .tabs {
      max-width: 350px;
      margin-left: auto;
      margin-right: auto;
    }

    .tabs {
      border: 1px solid lightgray;
    }

    .tabs__nav {
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      background: #f8f8f8;
      margin: 0;
      border-bottom: 1px solid lightgray;
    }

    .tabs__link {
      padding: 0.5rem 0.75rem;
      text-decoration: none;
      color: black;
      text-align: center;
      flex-shrink: 0;
      flex-grow: 1;
    }

    .tabs__link_active {
      background: lightgray;
      cursor: default;
    }

    .tabs__link:not(.tabs__link_active):hover,
    .tabs__link:not(.tabs__link_active):focus {
      background-color: #efefef;
    }

    .tabs__content {
      padding: 1rem;
    }

    .tabs__pane {
      display: none;
    }

    .tabs__pane_show {
      display: block;
    }
  </style>

</head>

<body>

  <div class="tabs">
    <div class="tabs__nav">
      <a class="tabs__link tabs__link_active" href="#content-1">Вкладка 1</a>
      <a class="tabs__link" href="#content-2">Вкладка 2</a>
      <a class="tabs__link" href="#content-3">Вкладка 3</a>
    </div>
    <div class="tabs__content">
      <div class="tabs__pane tabs__pane_show" id="content-1">
        Содержимое 1...
      </div>
      <div class="tabs__pane" id="content-2">
        Содержимое 2...
      </div>
      <div class="tabs__pane" id="content-3">
        Содержимое 3...
      </div>
    </div>
  </div>

  <script>
    var $tabs = function (target) {
      var
        _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
        _eventTabsShow,
        _showTab = function (tabsLinkTarget) {
          var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
          tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
          tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.tabs__link_active');
          tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.tabs__pane_show');
          // если следующая вкладка равна активной, то завершаем работу
          if (tabsLinkTarget === tabsLinkActive) {
            return;
          }
          // удаляем классы у текущих активных элементов
          if (tabsLinkActive !== null) {
            tabsLinkActive.classList.remove('tabs__link_active');
          }
          if (tabsPaneShow !== null) {
            tabsPaneShow.classList.remove('tabs__pane_show');
          }
          // добавляем классы к элементам (в завимости от выбранной вкладки)
          tabsLinkTarget.classList.add('tabs__link_active');
          tabsPaneTarget.classList.add('tabs__pane_show');
          document.dispatchEvent(_eventTabsShow);
        },
        _switchTabTo = function (tabsLinkIndex) {
          var tabsLinks = _elemTabs.querySelectorAll('.tabs__link');
          if (tabsLinks.length > 0) {
            if (tabsLinkIndex > tabsLinks.length) {
              tabsLinkIndex = tabsLinks.length;
            } else if (tabsLinkIndex < 1) {
              tabsLinkIndex = 1;
            }
            _showTab(tabsLinks[tabsLinkIndex - 1]);
          }
        };

      _eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

      _elemTabs.addEventListener('click', function (e) {
        var tabsLinkTarget = e.target;
        // завершаем выполнение функции, если кликнули не по ссылке
        if (!tabsLinkTarget.classList.contains('tabs__link')) {
          return;
        }
        // отменяем стандартное действие
        e.preventDefault();
        _showTab(tabsLinkTarget);
      });

      return {
        showTab: function (target) {
          _showTab(target);
        },
        switchTabTo: function (index) {
          _switchTabTo(index);
        }
      }

    };

    $tabs('.tabs');
  </script>

</body>

</html>							
						