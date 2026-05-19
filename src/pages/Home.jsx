import { useEffect, useState } from 'react';
import useTimer from '../hook/useTimer';
import Timer from '../components/Timer';
import Controls from '../components/Controls';
import formatTime from '../utils/formatTime';
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const STORAGE_KEY = 'study_sessions';

const Home = () => {
    const {
        seconds,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer,
    } = useTimer();

    const [startTimestamp, setStartTimestamp] = useState(null);
    const [sessions, setSessions] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("Failed to load sessions", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        } catch (e) {
            // ignore
            console.error("Failed to save sessions", e);
        }
    }, [sessions]);

    const handleStart = () => {
        resetTimer();
        setStartTimestamp(Date.now());
        startTimer();
    };

    const handleStop = () => {
        stopTimer();

        const end = Date.now();
        const duration = seconds;

        const session = {
            id: String(Date.now()),
            start: startTimestamp ? new Date(startTimestamp).toISOString() : new Date(end - duration * 1000).toISOString(),
            end: new Date(end).toISOString(),
            duration, // seconds
        };

        setSessions((prev) => [session, ...prev]);

        setStartTimestamp(null);
        resetTimer();
    };

    const clearHistory = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: "#FFCC00",
            background: "#BADEEF",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Clear it!"
        }).then((result) => {
            if (result.isConfirmed) Swal.fire({
                title: "Cleared!",
                text: "Your session history has been cleared.",
                icon: "success",
                background: "#BADEEF",
                iconColor: "#3085d6",
                confirmButtonColor: "#3085d6",
            }).then(() => setSessions([]));
        });
    };

    const totalSeconds = sessions.reduce((s, it) => s + (it.duration || 0), 0);

    //PDF EXPORT
    const exportPdf = () => {
        if (sessions.length === 0) return;

        const doc = new jsPDF();

        //TITLE 
        doc.setFontSize(20);
        doc.text("Study Session Report", 14, 20);

        //GENERATED DATE
        doc.setFontSize(10);
        doc.text(
            `Generated: ${new Date().toLocaleString()}`,
            14,
            28
        );

        //TOTAL TIME
        doc.setFontSize(12);
        doc.text(
            `Total Study Time: ${formatTime(totalSeconds)}`,
            14,
            38
        );

        //TABLE
        autoTable(doc, {
            startY: 48,
            head: [["Start Time", "End Time", "Duration"]],
            body: sessions.map((session) => [
                new Date(session.start).toLocaleString(),
                new Date(session.end).toLocaleString(),
                formatTime(session.duration),
            ]),
            styles: {
                fontSize: 10,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: [8, 145, 178],
            },
        });

        //DOWNLOAD
        doc.save(
            `study-report-${new Date()
                .toISOString()
                .slice(0, 10)}.pdf`
        );
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage: `url('/images/background.webp')`,
            }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
            <div className="bg-white/50 p-10 rounded-2xl shadow-lg w-100 relative z-10 ">
                <h1 className="text-5xl text-cyan-600 font-bold text-center mb-8">Study Tracker</h1>

                <Timer seconds={seconds} />

                <Controls
                    isRunning={isRunning}
                    startTimer={handleStart}
                    stopTimer={handleStop}
                />

                <div className="mt-6">
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <h2 className="font-semibold">Session History</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={exportPdf}
                                disabled={sessions.length === 0}
                                className={
                                    `text-sm rounded-md px-2 py-1 transition-colors duration-200 ` +
                                    (sessions.length === 0
                                        ? 'text-gray-500 cursor-not-allowed'
                                        : 'text-cyan-700 hover:bg-gray-200/50 cursor-pointer')
                                }
                            >
                                Export PDF
                            </button>
                            <button
                                onClick={() => sessions.length && clearHistory()}
                                disabled={sessions.length === 0}
                                className={
                                    `text-sm rounded-md px-2 py-1 transition-colors duration-200 ` +
                                    (sessions.length === 0
                                        ? 'text-gray-500 cursor-not-allowed'
                                        : 'text-red-500 cursor-pointer hover:bg-gray-200/50')
                                }
                            >
                                Clear
                            </button>
                        </div>
                    </div>


                    <ul className="max-h-40 overflow-auto divide-y">
                        {sessions.length === 0 && (
                            <li className="text-gray-500">No sessions yet</li>
                        )}

                        {sessions.map((s) => (
                            <li key={s.id} className="py-2 flex justify-between">
                                <div className="text-xs text-gray-700">{new Date(s.start).toLocaleString()}</div>
                                <div className="text-sm font-mono">{formatTime(s.duration)}</div>
                            </li>
                        ))}
                    </ul>
                    <div className="text-sm text-gray-600 mb-2">Total: {formatTime(totalSeconds)}</div>

                </div>
            </div>
        </div>
    );
};

export default Home;