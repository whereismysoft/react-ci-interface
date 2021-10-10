import { useEffect } from "react";

export const useOutsideClickHandler = (ref, cb) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                cb()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export const getValues = () => {
    const values = JSON.parse(localStorage.getItem('ci-data'))
    return values || {}
}

export const msToTime = (ms) => {
    var s = Math.round(ms / 1000);
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    var str = ''

    if (hrs) str += hrs + ' ч '
    if (mins) str += mins + ' мин'
    return str || '0 мин'
}

export const mocks = {
    count: 60, // далее сравниваем coun и items length и отображаем кнопку загрузить еще
    items: [
        {
            status: 'ready',
            id: '#1368',
            title: 'add document for postgres scaler',
            branch: 'master',
            hash: '9c90b9',
            author: 'Philip Kirkorov',
            date: 1611360360000,
            duration: 4800000
        },
        {
            status: 'failed',
            id: '#1367',
            title: 'Super cool UI kit for making websites that looks like games',
            branch: 'master',
            hash: '952e5567',
            author: 'Vadim Makeev',
            date: 1611360360000,
            duration: 4800000
        },
        {
            status: 'ready',
            id: '#1366',
            title: 'Merge branch "master" of github.com:jaywcjlove/awesome ',
            branch: 'master',
            hash: 'b463ab',
            author: 'Philip Kirkorov',
            date: 1611360360000,
            duration: 4800000
        },
        {
            status: 'pending',
            id: '#1365',
            title: 'Upgrade typescript to 3.8',
            branch: 'master',
            hash: '9c90b9',
            author: 'Philip Kirkorov',
            date: 1611360360000,
            duration: 4800000
        },
        {
            status: 'ready',
            id: '#1364',
            title: 'add document to postgres scaler',
            branch: 'master',
            hash: 'b463ab',
            author: 'Philip Kirkorov',
            date: 1611360360000,
            duration: 4800000
        },
        {
            status: 'failed',
            id: '#1363',
            title: 'Super cool UI kit for making websites that looks like games',
            branch: 'master',
            hash: '952e5567',
            author: 'Vadim Makeev',
            date: 1611360360000,
            duration: 4800000
        },
    ]
}