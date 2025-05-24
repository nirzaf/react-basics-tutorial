
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TopicView } from './components/TopicView';
import { TOPICS_DATA, APP_TITLE } from './constants';
import { Topic } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = TOPICS_DATA.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 to-sky-800 text-gray-100">
        <header className="bg-slate-800/70 backdrop-blur-md shadow-lg p-4 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-sky-400">{APP_TITLE}</h1>
            {/* Future search bar placeholder */}
          </div>
        </header>

        <div className="flex flex-1 container mx-auto mt-4 overflow-hidden">
          <aside className="w-1/4 p-4 space-y-4 bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-md overflow-y-auto mr-4 max-h-[calc(100vh-120px)]">
            <input 
              type="text"
              placeholder="Search topics..."
              className="w-full p-2 rounded bg-slate-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Navbar topics={filteredTopics} />
          </aside>

          <main className="flex-1 p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-120px)]">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/topic/:topicId" element={<TopicWrapper />} />
              <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback to home */}
            </Routes>
          </main>
        </div>
        <footer className="text-center p-4 text-sm text-slate-400 bg-slate-800/70 backdrop-blur-md mt-auto">
          Quadrate Tech Solutions
        </footer>
      </div>
    </HashRouter>
  );
};

const WelcomePage: React.FC = () => {
  const introTopic = TOPICS_DATA.find(t => t.id === 'intro');
  if (!introTopic) return <p className="text-center text-xl mt-10">Welcome! Select a topic to begin.</p>;
  
  return (
     <div className="prose prose-invert max-w-none prose-h1:text-sky-400 prose-h2:text-sky-500 prose-a:text-sky-400 hover:prose-a:text-sky-300">
        <h1 className="text-4xl font-bold mb-6 text-sky-300">{introTopic.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: introTopic.explanation }} />
        {introTopic.codeExample.code && (
            <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-2 text-sky-500">Quick Example</h3>
                 <CodeBlock code={introTopic.codeExample.code} />
                 {introTopic.codeExample.outputDescription && <p className="text-sm italic mt-2 text-gray-400">{introTopic.codeExample.outputDescription}</p>}
            </div>
        )}
        <p className="mt-8 text-lg">
            Explore the topics in the sidebar to dive deeper into React!
        </p>
     </div>
  );
};

const TopicWrapper: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = TOPICS_DATA.find(t => t.id === topicId);

  if (!topic) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-semibold text-red-400">Topic Not Found</h2>
        <p className="mt-4">The topic you are looking for does not exist. Please select one from the sidebar.</p>
        <Link to="/" className="mt-6 inline-block bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
          Go to Home
        </Link>
      </div>
    );
  }
  return <TopicView topic={topic} />;
};

// A helper link component for completeness, though not strictly needed for TopicWrapper
import { Link } from 'react-router-dom';
import { CodeBlock } from './components/CodeBlock';


export default App;
    