# Лабораторная работа №2 ЯП

### Запуск сервера: `node .\server.js` из папки `server`.
### Запуск клиента: `npm start` из папки `file_manager_front`.

### Функционал приложения:
  1. Просмотр папок и файлов на локальном компьютере пользователя:
  
    1.1. Реализована возможность выбора текущего просматриваемого диска среди локальных дисков пользователя.
    
    1.2. Отслеживание пути, по которому пользователь добрался до текущего каталога, происходит в блоке `Path:`.
    
    1.3. Ссылка `Back to parent folder` позволяет вернуться к родительскому каталогу (на уровень выше).
    
    1.4. Если выбрать каталог, то будет совершён переход вглубь каталога: показаны каталоги и файлы внутри него.
    
    1.5. Сначала перечисляются все папки, находящиеся в текущем каталоге, потом файлы. Ппаки и файлы имеют отличительный значок перед своим наименованием в файловой              системе пользователя. Если выбранная папка пуста, пользователь получит соответсстующее опопвещение об этом.
    
  2. Удалённое скачивание файлов:
  
    2.1. Если выбрать файл, то произойдёт скачивание в папку, в которою бразер помещает любые скачанные пользователем файлы. Имя файла совпадает с именем того же файла          на локальном диске пользователя.
    
###Скриншот приложения:
![image](https://user-images.githubusercontent.com/85176272/211212959-66fc7491-cc53-47be-9aef-4baf3f3a5a51.png)
