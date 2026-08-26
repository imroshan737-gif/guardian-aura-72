import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Sparkles,
  Activity,
  Target,
  Moon,
  Zap,
  Shield,
  Heart,
  BarChart3,
  UserPlus,
  LogIn,
  ChevronDown,
} from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import NeonButton from "@/components/NeonButton";
import DemoPreview from "@/components/DemoPreview";
import { PrivacyModal, TermsModal, ContactModal } from "@/components/FooterModals";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showDemoTour, setShowDemoTour] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchParams.get("signup") === "true") {
      navigate("/auth?mode=signup");
    }
  }, [searchParams, navigate]);

  const handleDemoComplete = () => {
    setShowDemoTour(false);
    navigate("/dashboard?demo=true");
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: Brain,
      title: "AI Stress Detection",
      description: "Real-time stress monitoring with predictive analytics to prevent burnout before it happens.",
      accent: "text-primary",
    },
    {
      icon: Target,
      title: "Focus Enhancement",
      description: "Smart study sessions with concentration techniques and distraction blocking.",
      accent: "text-secondary",
    },
    {
      icon: Moon,
      title: "Sleep Optimization",
      description: "Track and improve your sleep quality for better cognitive performance.",
      accent: "text-accent",
    },
    {
      icon: Zap,
      title: "Energy Management",
      description: "Monitor energy levels and get personalized break recommendations.",
      accent: "text-primary",
    },
    {
      icon: Shield,
      title: "Mental Health Shield",
      description: "Proactive intervention system that detects early warning signs.",
      accent: "text-secondary",
    },
    {
      icon: Heart,
      title: "Emotional Intelligence",
      description: "Understand your emotional patterns and build resilience over time.",
      accent: "text-accent",
    },
  ];

  const stats = [
    { value: "40%", label: "Stress Reduction" },
    { value: "2x", label: "Focus Boost" },
    { value: "85%", label: "Better Sleep" },
    { value: "24/7", label: "AI Support" },
  ];

  return (
    <div className="min-h-screen relative bg-background overflow-x-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-transform duration-500 ease-out ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground/90" />
            </div>
            <span className="font-orbitron text-[17px] font-semibold tracking-[-0.02em] text-foreground">
              NeuroAura
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/auth?mode=login")}
              className="flex h-9 items-center gap-2 rounded-lg px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </button>
            <NeonButton onClick={() => navigate("/auth?mode=signup")} size="sm" variant="ghost">
              <UserPlus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sign Up</span>
              <span className="sm:hidden">Join</span>
            </NeonButton>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pt-28 pb-20 text-center lg:px-10">
        <div className="relative mx-auto w-full max-w-[880px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3.5 py-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[12.5px] font-medium tracking-[0.02em] text-muted-foreground">
              AI-Powered Wellness Platform
            </span>
          </div>

          <h1 className="mt-8 font-orbitron text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-[4.5rem]">
            <span className="text-foreground">Your mental wellness</span>
            <br />
            <span className="text-gradient">guardian, always on.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[560px] text-base leading-[1.7] text-muted-foreground sm:text-[17px]">
            An intelligent platform that predicts stress, prevents burnout, and helps students
            achieve peak performance — powered by advanced AI.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <NeonButton onClick={() => navigate("/auth?mode=signup")} size="lg" className="group">
              Begin Your Journey
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </NeonButton>
            <NeonButton variant="ghost" size="lg" onClick={() => setShowDemoTour(true)}>
              <Sparkles className="mr-2 w-4 h-4" />
              Explore Demo
            </NeonButton>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-[720px] grid-cols-2 gap-y-8 border-t border-border/70 pt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-orbitron text-[28px] font-semibold tracking-[-0.03em] text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-[11.5px] font-medium uppercase tracking-[0.09em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollToFeatures}
          aria-label="Scroll to features"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/40 transition-colors hover:text-muted-foreground"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="relative z-10 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 py-1">
              <BarChart3 className="w-3 h-3 text-secondary" />
              <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Features
              </span>
            </div>
            <h2 className="mt-6 font-orbitron text-3xl font-semibold tracking-[-0.035em] sm:text-[40px] sm:leading-[1.1]">
              Intelligent features, quietly working
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.7] text-muted-foreground">
              Cutting-edge AI designed for student mental wellness — precise, private, and always
              attentive.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-card p-7 transition-colors duration-200 hover:bg-muted/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-border bg-background/60">
                  <feature.icon className={`h-[18px] w-[18px] ${feature.accent}`} />
                </div>
                <h3 className="mt-5 font-orbitron text-[16.5px] font-semibold tracking-[-0.02em] text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-[620px]">
            <h2 className="font-orbitron text-3xl font-semibold tracking-[-0.035em] sm:text-[40px] sm:leading-[1.1]">
              How it works
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.7] text-muted-foreground">
              Three simple steps to transform your mental wellness.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              {
                step: "01",
                title: "Take Assessment",
                description:
                  "Complete a quick stress assessment to establish your baseline and get personalized insights.",
                icon: Brain,
              },
              {
                step: "02",
                title: "Get AI Insights",
                description:
                  "Our AI analyzes your patterns and provides real-time recommendations tailored to you.",
                icon: Activity,
              },
              {
                step: "03",
                title: "Improve Daily",
                description:
                  "Follow guided sessions, track progress, and watch your wellness score improve over time.",
                icon: Target,
              },
            ].map((item) => (
              <div key={item.step} className="relative border-t border-border pt-7">
                <div className="flex items-center gap-3">
                  <span className="font-orbitron text-[12px] font-semibold tracking-[0.1em] text-primary">
                    {item.step}
                  </span>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-orbitron text-[17px] font-semibold tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 pb-28 pt-8 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center sm:px-16">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
              }}
            />
            <h2 className="mx-auto max-w-[520px] font-orbitron text-[28px] font-semibold leading-[1.15] tracking-[-0.035em] sm:text-[36px]">
              Ready to transform your wellness?
            </h2>
            <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.7] text-muted-foreground">
              Join students who have taken control of their mental health with NeuroAura.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <NeonButton onClick={() => navigate("/auth?mode=signup")} size="lg">
                Get Started Free
              </NeonButton>
              <NeonButton variant="ghost" size="lg" onClick={() => setShowDemoTour(true)}>
                Watch Demo
              </NeonButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/70 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary-foreground/90" />
            </div>
            <span className="text-[13px] text-muted-foreground">
              <span className="font-orbitron font-medium text-foreground">NeuroAura</span> — Made to
              help students thrive
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </button>
            <button
              onClick={() => setShowTerms(true)}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </button>
            <button
              onClick={() => setShowContact(true)}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </button>
          </div>
          <div className="font-orbitron text-[11px] tracking-[0.08em] text-muted-foreground/50">
            v2.0.1
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DemoPreview open={showDemoTour} onOpenChange={setShowDemoTour} onComplete={handleDemoComplete} />
      <PrivacyModal open={showPrivacy} onOpenChange={setShowPrivacy} />
      <TermsModal open={showTerms} onOpenChange={setShowTerms} />
      <ContactModal open={showContact} onOpenChange={setShowContact} />
    </div>
  );
};

export default Index;
