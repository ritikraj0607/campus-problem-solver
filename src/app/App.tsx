import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  Building2,
  Heart,
  Sparkles,
  Droplet,
  Bath,
  ArrowRight,
  CheckCircle2,
  Bot,
  User,
  Shield,
  Wrench,
  CheckCheck
} from "lucide-react";
import AIImageSorter from "./components/AIImageSorter";

export default function App() {
  const navigate = useNavigate();
  const problemCategories = [
    {
      icon: Building2,
      title: "Hostel & College",
      description: "Room maintenance, facilities, and infrastructure issues",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Heart,
      title: "Health Services",
      description: "Medical emergencies and health facility concerns",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Sparkles,
      title: "Cleaning",
      description: "Hygiene and sanitation problems across campus",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: Droplet,
      title: "Water Supply",
      description: "Water availability and quality issues",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Bath,
      title: "Bathroom",
      description: "Washroom maintenance and cleanliness",
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      icon: Bot,
      title: "AI Chatbot",
      description: "24/7 intelligent assistant for instant help and guidance",
      gradient: "from-violet-500 to-purple-500"
    },
  ];

  const workflowSteps = [
    { icon: User, label: "Student", color: "from-blue-500 to-cyan-500" },
    { icon: Shield, label: "Admin", color: "from-purple-500 to-pink-500" },
    { icon: Wrench, label: "Workers", color: "from-orange-500 to-red-500" },
    { icon: CheckCheck, label: "Resolved", color: "from-green-500 to-emerald-500" },
  ];

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-purple-900/90 to-blue-900/95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <span className="text-white/90 font-medium text-lg md:text-xl">Transform Campus Life</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold mb-6 text-white drop-shadow-2xl leading-tight">
              Campus Problem Solver
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-lg leading-relaxed"
          >
            Your voice matters. Report campus issues instantly and get them resolved faster than ever before.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="group bg-white text-blue-600 px-12 py-7 rounded-full text-2xl font-bold inline-flex items-center gap-3 shadow-2xl transition-all hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-white"
          >
            Get Started Now
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-base md:text-lg text-white/80"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
              <span className="font-semibold">Fast Resolution</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
              <span className="font-semibold">24/7 AI Support</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
              <span className="font-semibold">Track Progress</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2 } }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* What It Is Section with Split Layout */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-base font-semibold mb-6">
                ABOUT US
              </div>
              <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                What is Campus Problem Solver?
              </h2>
              <p className="text-2xl text-gray-700 leading-relaxed mb-6">
                Campus Problem Solver is a comprehensive platform designed to bridge the gap between students and campus administration.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                We provide a streamlined system where students can report issues, track their resolution status, and ensure their concerns are heard and addressed promptly.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-gray-700 text-lg">Active 24/7</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-lg">
                  <Bot className="w-6 h-6 text-purple-600 shrink-0" />
                  <span className="font-semibold text-gray-700 text-lg">AI-Powered</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1652305500057-0fcb348b62aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Students collaborating"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-2xl max-w-xs">
                <p className="text-5xl font-bold text-blue-600 mb-2">1000+</p>
                <p className="text-gray-600 font-medium text-lg">Problems Solved</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resolution Workflow Section */}
      <section className="relative py-32 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-base font-semibold mb-6">
              RESOLUTION PATHWAY
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">Your Problem's Journey</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From submission to solution, watch your problem get resolved through our streamlined workflow
            </p>
          </motion.div>

          {/* Workflow Visualization */}
          <div className="relative mb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative flex-1"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl mb-4`}
                      >
                        <Icon className="w-14 h-14 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-800">{step.label}</h3>
                    </div>

                    {/* Arrow connecting steps */}
                    {index < workflowSteps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                        className="hidden md:block absolute top-12 left-[60%] w-[80%] h-1 bg-gradient-to-r from-blue-400 to-purple-400"
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-purple-400 border-y-4 border-y-transparent"></div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* How It Works Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Report the Issue",
                description: "Submit your problem with just a few clicks. Choose from hostel, health, cleaning, water, bathroom issues and more.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "Smart Routing",
                description: "Our AI-powered system automatically routes your complaint to the right admin and assigns workers instantly.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Track & Resolve",
                description: "Monitor real-time updates as it moves from admin approval to worker assignment to final resolution.",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl transform group-hover:scale-105 transition-transform"></div>
                <div className="relative p-8 rounded-3xl border-2 border-gray-100 bg-white/80 backdrop-blur-sm shadow-lg">
                  <div className={`text-8xl font-bold bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent mb-4`}>
                    {item.step}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Categories Section with Background */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background with Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520569495996-b5e1219cb625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Students"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-purple-600/95 to-blue-600/95"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <span className="text-white font-semibold text-lg">OUR FEATURES</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Problems We Handle
            </h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              From infrastructure to health, we've got every campus concern covered
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problemCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateY: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl transform group-hover:scale-105 transition-transform blur-xl"></div>
                  <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}
                    >
                      <Icon className="w-9 h-9 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-4 text-white">{category.title}</h3>
                    <p className="text-white/90 leading-relaxed text-lg">{category.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section with Background */}
      <section className="relative py-40 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1648301033733-44554c74ec50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Campus life"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-purple-900/95 to-indigo-900/95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_70%)]"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCheck className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <h2 className="text-6xl md:text-8xl font-bold mb-8 text-white drop-shadow-2xl leading-tight">
              Ready to Make Campus Better?
            </h2>
            <p className="text-3xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed">
              Join hundreds of students already using Campus Problem Solver to create positive change. Your voice, amplified.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 30px 60px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white px-14 py-7 rounded-full text-2xl font-bold inline-flex items-center gap-3 shadow-2xl transition-all"
              >
                Start Solving Problems
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md text-white px-14 py-7 rounded-full text-2xl font-bold border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                Learn More
              </motion.button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "1000+", label: "Problems Solved" },
                { number: "500+", label: "Active Students" },
                { number: "24/7", label: "AI Support" },
                { number: "95%", label: "Resolution Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/70 text-base font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}