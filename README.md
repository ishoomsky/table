# Задание:

1. во всем приложении используем https://www.carbondesignsystem.com/
2. все приложение пишем на hooks, разбиваем на компоненты, переиспользуем их
3. массив с данными, читаем из json и сохраняем в local storage ( данные на ваше усмотрение, но нужно чтобы была возможность потом из отредактировать используя select, radio button, input, textarea)
4. выводим данные в таблицу ( используем https://www.carbondesignsystem.com/ )
5. последняя колонка в таблице содержит иконки удаления и редактирования, при нажатии на удаление появляется модальное окно с подтверждением, точно ли мы хотим удалить( делаем таймаут пару секунд при удалении при этом на экране появляется спинер, когда удалилось, появляется сообщение, такая-то строка была удалена). При нажатие на редактирование появляется модальное окно с формой для редактирования( в форму добавить select, radio button, input, textarea), редактируем, сохраняем, в таблице данные обновляются
6. есть кнопка добавить , по нажатию появляется форма аналогичная как при редактировании, добавляем, сохраняем в таблице, также делаем спинер как при удалении и после добавления нотификация, что было добавлено
7. добавляем проверки чтобы все поля были введены, кнопочка добавить в форме задисейблена,если что-то не введено
8. используем для обработки формы ( https://formik.org/docs/overview )
9. добавляем propTypes
