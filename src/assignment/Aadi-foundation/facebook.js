import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Facebook() {
  const [profile, setProfile] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [insights, setInsights] = useState(null);
  const [since, setSince] = useState('');
  const [until, setUntil] = useState('');

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/facebook';
  };

  const fetchProfileAndPages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/facebook/callback');
      setProfile(response.data.profile);
      setPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching profile and pages', error);
    }
  };

  const fetchPageInsights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/page-insights', {
        params: {
          pageId: selectedPage,
          accessToken: profile.access_token,
          since: since,
          until: until,
        },
      });
      setInsights(response.data);
    } catch (error) {
      console.error('Error fetching page insights', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Facebook Login and Insights</h1>
        {!profile ? (
          <button onClick={handleLogin}>Login with Facebook</button>
        ) : (
          <div>
            <img src={profile.picture.data.url} alt="Profile" />
            <h2>Welcome, {profile.name}</h2>
            <button onClick={fetchProfileAndPages}>Fetch Pages</button>
            <select onChange={(e) => setSelectedPage(e.target.value)}>
              <option value="">Select Page</option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>{page.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={since}
              onChange={(e) => setSince(e.target.value)}
              placeholder="Since"
            />
            <input
              type="date"
              value={until}
              onChange={(e) => setUntil(e.target.value)}
              placeholder="Until"
            />
            <button onClick={fetchPageInsights}>Get Insights</button>
            {insights && (
              <div>
                <div>Total Followers: {insights.data.find(metric => metric.name === 'page_fans')?.values[0]?.value}</div>
                <div>Total Engagement: {insights.data.find(metric => metric.name === 'page_engaged_users')?.values[0]?.value}</div>
                <div>Total Impressions: {insights.data.find(metric => metric.name === 'page_impressions')?.values[0]?.value}</div>
                <div>Total Reactions: {insights.data.find(metric => metric.name === 'page_reactions')?.values[0]?.value}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </Router>
  );
}

export default Facebook;
