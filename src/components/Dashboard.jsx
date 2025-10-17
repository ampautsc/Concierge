import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('home');

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🦋 Habitat Restoration Concierge</h1>
          <div className="user-section">
            <span className="user-name">
              {user?.displayName || user?.email || 'User'}
            </span>
            <button onClick={handleSignOut} className="sign-out-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <nav className="dashboard-nav">
          <button 
            className={activeSection === 'home' ? 'active' : ''}
            onClick={() => setActiveSection('home')}
          >
            🏠 Home
          </button>
          <button 
            className={activeSection === 'resources' ? 'active' : ''}
            onClick={() => setActiveSection('resources')}
          >
            📚 Resources
          </button>
          <button 
            className={activeSection === 'events' ? 'active' : ''}
            onClick={() => setActiveSection('events')}
          >
            📅 Events
          </button>
          <button 
            className={activeSection === 'goals' ? 'active' : ''}
            onClick={() => setActiveSection('goals')}
          >
            🎯 My Goals
          </button>
        </nav>

        <div className="dashboard-content">
          {activeSection === 'home' && <HomeSection />}
          {activeSection === 'resources' && <ResourcesSection />}
          {activeSection === 'events' && <EventsSection />}
          {activeSection === 'goals' && <GoalsSection />}
        </div>
      </main>
    </div>
  );
};

const HomeSection = () => (
  <div className="section-content">
    <h2>Welcome to Your Habitat Restoration Hub</h2>
    <p>Your personal organizer for habitat restoration. We'll help you find resources, discover events, and stay on track.</p>
    
    <div className="quick-links">
      <div className="quick-link-card">
        <h3>🌱 Native Plant Resources</h3>
        <p>Find databases and guides for selecting native plants</p>
      </div>
      <div className="quick-link-card">
        <h3>🔨 Project Guides</h3>
        <p>Access step-by-step restoration project instructions</p>
      </div>
      <div className="quick-link-card">
        <h3>🤝 Connect</h3>
        <p>Find mentors and local habitat restoration groups</p>
      </div>
      <div className="quick-link-card">
        <h3>💰 Funding</h3>
        <p>Discover grants and funding opportunities</p>
      </div>
    </div>
  </div>
);

const ResourcesSection = () => (
  <div className="section-content">
    <h2>Resource Links</h2>
    <p>Curated links to the best habitat restoration resources</p>
    
    <div className="resource-category">
      <h3>📖 Essential Guides</h3>
      <ul className="resource-list">
        <li>
          <a href="https://planeteerhandbook.com" target="_blank" rel="noopener noreferrer">
            Planeteer Handbook - Complete restoration guide
          </a>
        </li>
        <li>
          <a href="https://www.nwf.org/nativePlantFinder" target="_blank" rel="noopener noreferrer">
            National Wildlife Federation - Native Plant Finder
          </a>
        </li>
        <li>
          <a href="https://www.audubon.org/native-plants" target="_blank" rel="noopener noreferrer">
            Audubon Native Plants Database
          </a>
        </li>
        <li>
          <a href="https://www.xerces.org/pollinator-conservation" target="_blank" rel="noopener noreferrer">
            Xerces Society - Pollinator Conservation
          </a>
        </li>
      </ul>
    </div>

    <div className="resource-category">
      <h3>💰 Funding Opportunities</h3>
      <ul className="resource-list">
        <li>
          <a href="https://www.nfwf.org/programs" target="_blank" rel="noopener noreferrer">
            National Fish and Wildlife Foundation Grants
          </a>
        </li>
        <li>
          <a href="https://www.nrcs.usda.gov/programs-initiatives" target="_blank" rel="noopener noreferrer">
            USDA NRCS Conservation Programs
          </a>
        </li>
        <li>
          <strong>Local Habitat Restoration Grants</strong>
          <p>Check with your city, county, and state environmental agencies</p>
        </li>
        <li>
          <strong>Native Plant Rebate Programs</strong>
          <p>Many water districts offer rebates for native landscaping</p>
        </li>
      </ul>
    </div>

    <div className="resource-category">
      <h3>🎓 Learn & Connect</h3>
      <ul className="resource-list">
        <li>
          <a href="https://www.wildones.org/" target="_blank" rel="noopener noreferrer">
            Wild Ones - Native plant advocacy
          </a>
        </li>
        <li>
          <a href="https://monarchwatch.org/" target="_blank" rel="noopener noreferrer">
            Monarch Watch - Monarch butterfly conservation
          </a>
        </li>
        <li>
          <strong>Local Master Gardener Programs</strong>
          <p>Connect with experienced gardeners in your area</p>
        </li>
      </ul>
    </div>
  </div>
);

const EventsSection = () => (
  <div className="section-content">
    <h2>Find Local Events</h2>
    <p>Discover workshops, planting days, and educational opportunities near you</p>
    
    <div className="events-info">
      <div className="info-card">
        <h3>🔍 How to Find Events</h3>
        <ul>
          <li>Check local native plant societies and chapters</li>
          <li>Visit your county Extension office website</li>
          <li>Follow local Audubon chapters</li>
          <li>Join Wild Ones chapters in your area</li>
          <li>Check botanical garden calendars</li>
          <li>Search for local "native plant" or "habitat restoration" groups on Meetup</li>
        </ul>
      </div>

      <div className="info-card">
        <h3>📅 Schedule Reminders</h3>
        <p>Keep track of upcoming events using your favorite calendar app. Set reminders for:</p>
        <ul>
          <li>Plant sales and swaps</li>
          <li>Educational workshops</li>
          <li>Community planting days</li>
          <li>Garden tours</li>
          <li>Conservation volunteer opportunities</li>
        </ul>
      </div>
    </div>
  </div>
);

const GoalsSection = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
      setNewGoal('');
    }
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="section-content">
      <h2>My Restoration Goals</h2>
      <p>Track your personal habitat restoration goals and progress</p>

      <div className="goal-input-section">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          placeholder="Enter a new goal (e.g., Plant 5 native species this spring)"
          className="goal-input"
        />
        <button onClick={addGoal} className="add-goal-btn">Add Goal</button>
      </div>

      <div className="goals-list">
        {goals.length === 0 ? (
          <p className="empty-state">No goals yet. Add your first restoration goal above!</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal.id)}
                className="goal-checkbox"
              />
              <span className="goal-text">{goal.text}</span>
              <button onClick={() => deleteGoal(goal.id)} className="delete-goal-btn">
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      <div className="goals-tips">
        <h3>💡 Goal Setting Tips</h3>
        <ul>
          <li>Start small - even one native plant makes a difference</li>
          <li>Set specific, measurable goals</li>
          <li>Include a timeline for accountability</li>
          <li>Celebrate your wins along the way</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
