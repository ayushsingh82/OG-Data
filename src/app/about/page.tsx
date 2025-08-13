import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              About <span className="text-[#824CFF]">CARV</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Building the foundation for a decentralized AI future where trust, transparency, and collaboration drive innovation
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Our <span className="text-[#824CFF]">Mission</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                CARV is pioneering the future of decentralized AI infrastructure. We believe that AI should be transparent, 
                verifiable, and accessible to everyone. Our platform enables AI agents to operate autonomously while 
                maintaining complete transparency and trust through blockchain technology.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                By combining the power of AI with the security and transparency of blockchain, we&apos;re creating a new 
                paradigm where data quality, model performance, and computational integrity are guaranteed through 
                cryptographic proofs and decentralized verification.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Democratize access to AI infrastructure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Ensure data quality and model transparency</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Enable verifiable AI collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Build the foundation for Web3 AI</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 text-[#824CFF]">Vision Statement</h3>
                <p className="text-gray-300 italic">
                  &ldquo;To create a world where AI agents operate with complete transparency, where every computation 
                  is verifiable, and where trust is built through cryptographic proofs rather than blind faith.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet the <span className="text-[#824CFF]">Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍💻</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Alex Chen</h3>
              <p className="text-[#824CFF] mb-4">CEO & Co-Founder</p>
              <p className="text-gray-300 text-sm">
                Former AI researcher at OpenAI, blockchain architect, and serial entrepreneur. 
                Passionate about democratizing AI through decentralization.
              </p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👩‍🔬</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Dr. Sarah Kim</h3>
              <p className="text-[#824CFF] mb-4">CTO & Co-Founder</p>
              <p className="text-gray-300 text-sm">
                PhD in Computer Science from MIT, expert in zero-knowledge proofs and distributed systems. 
                Led research teams at Google and Microsoft.
              </p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍🎓</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Marcus Rodriguez</h3>
              <p className="text-[#824CFF] mb-4">Head of Research</p>
              <p className="text-gray-300 text-sm">
                Former professor at Stanford, specializing in AI safety and verifiable computation. 
                Published 50+ papers on AI ethics and blockchain technology.
              </p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👩‍💼</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Emily Watson</h3>
              <p className="text-[#824CFF] mb-4">Head of Product</p>
                              <p className="text-gray-300 text-sm">
                Product leader with 10+ years experience in AI and Web3. Previously led product teams 
                at Coinbase and Anthropic.
              </p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍🔧</span>
              </div>
              <h3 className="text-xl font-bold mb-2">David Park</h3>
              <p className="text-[#824CFF] mb-4">Lead Engineer</p>
              <p className="text-gray-300 text-sm">
                Full-stack engineer with expertise in Rust, Solana, and AI systems. 
                Built scalable infrastructure for multiple DeFi protocols.
              </p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👩‍🎨</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Lisa Thompson</h3>
              <p className="text-[#824CFF] mb-4">Head of Design</p>
              <p className="text-gray-300 text-sm">
                UX/UI designer focused on making complex AI and blockchain technology accessible. 
                Previously designed for Meta and Twitter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-[#824CFF]">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-gray-300">Every computation, decision, and data point is verifiable and auditable</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-gray-300">Building together with the global AI and Web3 communities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Security</h3>
              <p className="text-gray-300">Privacy-first approach with cryptographic guarantees</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-300">Pushing the boundaries of what&apos;s possible in AI and blockchain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-[#824CFF]">Journey</span>
          </h2>
          <div className="space-y-8">
            <div className="flex items-center space-x-8">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2022</span>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6 flex-1">
                <h3 className="text-xl font-bold mb-2">Foundation</h3>
                <p className="text-gray-300">CARV was founded with the vision of creating verifiable AI infrastructure. Initial research and development began.</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2023</span>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6 flex-1">
                <h3 className="text-xl font-bold mb-2">Prototype & Testing</h3>
                <p className="text-gray-300">First prototype of AI agent infrastructure on SVM Chain. Successful testing with early partners and developers.</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2024</span>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6 flex-1">
                <h3 className="text-xl font-bold mb-2">Launch & Growth</h3>
                <p className="text-gray-300">Public launch of CARV platform. Growing ecosystem with 500+ developers and 10,000+ verified datasets.</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2025</span>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6 flex-1">
                <h3 className="text-xl font-bold mb-2">Expansion</h3>
                <p className="text-gray-300">Expanding to enterprise solutions, DeSci partnerships, and global AI research collaboration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Get in <span className="text-[#824CFF]">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Have questions about CARV? Want to collaborate? We&apos;d love to hear from you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-2">General Inquiries</h3>
              <p className="text-[#824CFF]">hello@carv.ai</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Partnerships</h3>
              <p className="text-[#824CFF]">partnerships@carv.ai</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Press & Media</h3>
              <p className="text-[#824CFF]">press@carv.ai</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 