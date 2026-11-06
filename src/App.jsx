import React, { useState, useEffect } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review Data Structures & Algorithms', completed: true },
    { id: 2, text: 'Build Pygame Sudoku Project', completed: true },
    { id: 3, text: 'Deploy React App to GitHub Pages', completed: false },
  ]);
  const [input, setInput] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

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
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#818cf8', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>Developer Focus Hub</h1>
        <p style={{ color: '#94a3b8' }}>Live Clock: <span style={{ fontFamily: 'monospace', color: '#c7d2fe' }}>{time}</span></p>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
        <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            style={{ flex: 1, padding: '10px 14px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none' }}
          />
          <button type="submit" style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Add Task
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tasks.map((task) => (
            <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', border: '1px solid #334155' }}>
              <div onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={task.completed} onChange={() => {}} />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#64748b' : '#f1f5f9' }}>
                  {task.text}
                </span>
              </div>
              <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>
                ✕
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
