import React, { useState, useEffect } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review Data Structures & Algorithms', completed: true },
    { id: 2, text: 'Build Pygame Sudoku Project', completed: true },
    { id: 3, text: 'Deploy React App to GitHub Pages', completed: false },
  ]);
  const [input, setInput] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-6 font-sans">
      {/* Header */}
      <header className="w-full max-w-2xl text-center my-8">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-2">Developer Focus Hub</h1>
        <p className="text-slate-400 text-lg">Live Clock: <span className="font-mono text-indigo-300">{time}</span></p>
      </header>

      {/* Main Dashboard Card */}
      <main className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task or project objective..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          <button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-slate-500 text-center py-4">No active tasks. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center justify-between bg-slate-900/60 border border-slate-700/50 p-4 rounded-lg"
              >
                <div 
                  onClick={() => toggleTask(task.id)} 
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => {}} 
                    className="h-5 w-5 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span className={task.completed ? "line-through text-slate-500" : "text-slate-200"}>
                    {task.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-500 hover:text-red-400 font-semibold px-2 transition"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
