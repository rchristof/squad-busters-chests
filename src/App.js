import React, { useState, useEffect } from 'react';
import './styles.css';
import Tab from './components/Tab';
import ChestGrid from './components/ChestGrid';

const sequence = [
    0, 1, 0, 2, 0, 0, 1, 0, 1, 1,
    0, 0, 1, 0, 0, 2, 0, 1, 0, 1,
    0, 0, 0, 1, 0, 1, 0, 0, 1, 1,
    0, 0, 0, 2, 0, 2, 1, 0, 0, 1,
    0, 0, 0, 1, 0, 1, 0, 0, 0, 1,
    0, 2, 0, 0, 0, 0, 1, 0, 2, 1
];

function App() {
    const [tabs, setTabs] = useState(() => {
        const savedData = JSON.parse(localStorage.getItem('tabsData')) || [{ id: 1, name: "Tab 1", clicked: [] }];
        return savedData;
    });

    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [editingTab, setEditingTab] = useState(null);
    const [startIndex, setStartIndex] = useState(0); // Índice inicial para a grid menor

    useEffect(() => {
        localStorage.setItem('tabsData', JSON.stringify(tabs));
    }, [tabs]);

    const addTab = () => {
        const newTabId = tabs.length ? tabs[tabs.length - 1].id + 1 : 1;
        const newTab = { id: newTabId, name: `Tab ${newTabId}`, clicked: [] };
        setTabs([...tabs, newTab]);
        setActiveTab(newTabId);
    };

    const resetTab = (id) => {
        const resetTabs = tabs.map(tab => tab.id === id ? { id: tab.id, name: `Tab ${tab.id}`, clicked: [] } : tab);
        setTabs(resetTabs);
        setActiveTab(id);
    };

    const removeTab = (id) => {
        if (tabs.length === 1) {
            resetTab(id); 
        } else {
            const filteredTabs = tabs.filter(tab => tab.id !== id);
            const tabIndex = tabs.findIndex(tab => tab.id === id);
            const nextTab = filteredTabs[tabIndex - 1] || filteredTabs[tabIndex] || filteredTabs[0];
            setActiveTab(nextTab.id);
            setTabs(filteredTabs);
        }
    };

    const handleDoubleClick = (id) => {
        setEditingTab(id);
    };

    const handleNameChange = (e, id) => {
        const newName = e.target.value;
        setTabs(tabs.map(tab => tab.id === id ? { ...tab, name: newName } : tab));
    };

    const handleNameSubmit = (e, id) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            setEditingTab(null);
        }
    };

    const updateClickedItems = (id, clicked) => {
        const updatedTabs = tabs.map(tab => tab.id === id ? { ...tab, clicked } : tab);
        setTabs(updatedTabs);
    };

    const handleGridClick = (index) => {
        setStartIndex((index + 1) % sequence.length); // Define o índice inicial para a grid menor
    };

    const getNextItems = () => {
        if (!sequence || sequence.length === 0) return []; // Verifica se a sequência existe e se tem elementos
        return Array.from({ length: 10 }, (_, i) => sequence[(startIndex + i) % sequence.length]);
    };

    return (
        <div className="App">
            <div className="outer-container">
                <div className="tabs-wrapper">
                    <div className="tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={activeTab === tab.id ? "active" : ""}
                                onClick={() => setActiveTab(tab.id)}
                                onDoubleClick={() => handleDoubleClick(tab.id)}
                            >
                                {editingTab === tab.id ? (
                                    <input
                                        type="text"
                                        value={tab.name}
                                        onChange={(e) => handleNameChange(e, tab.id)}
                                        onBlur={(e) => handleNameSubmit(e, tab.id)}
                                        onKeyDown={(e) => handleNameSubmit(e, tab.id)}
                                        autoFocus
                                    />
                                ) : (
                                    tab.name
                                )}
                                <span onClick={(e) => { e.stopPropagation(); removeTab(tab.id); }}> x</span>
                            </button>
                        ))}
                        <button onClick={addTab}>+ Add Tab</button>
                    </div>
                </div>
                {tabs.map(tab => (
                    activeTab === tab.id && (
                        <Tab
                            key={tab.id}
                            tabId={tab.id}
                            clicked={tab.clicked}
                            updateClickedItems={updateClickedItems}
                            onItemClick={handleGridClick} // Adiciona o clique para atualizar a grid menor
                        />
                    )
                ))}
                <ChestGrid items={getNextItems()} />
            </div>
        </div>
    );
}

export default App;
