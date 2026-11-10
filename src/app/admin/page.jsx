'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save, 
  CheckCircle2, 
  Users, 
  X,
  Star,
  ExternalLink,
  Briefcase,
  Layers,
  Globe,
  Settings,
  Phone,
  Mail,
  UploadCloud,
  ImageIcon,
  Loader2,
  Cpu,
  ArrowUpRight,
  FolderOpen,
  LogOut,
  ShieldCheck,
  Shield,
  Crown,
  UserPlus,
  Lock
} from 'lucide-react';
import CornerBrackets, { SectionBadge } from '@/components/CornerBrackets';
import FlowFieldCanvas from '@/components/FlowFieldCanvas';
import DrivenItWordmark from '@/components/DrivenItWordmark';
import AdminGoogleAuthModal from '@/components/AdminGoogleAuthModal';

export default function AdminPage() {
  // Authentication State
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [activeTab, setActiveTab] = useState('team'); 
  // Tabs: 'projects' | 'products' | 'services' | 'team' | 'reviews' | 'settings' | 'users'
  const [toast, setToast] = useState(null);

  // ================= 7. USERS & ROLES STATE =================
  const [usersList, setUsersList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'admin' });
  const [savingUser, setSavingUser] = useState(false);
  const [userActionLoadingId, setUserActionLoadingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch('/api/users');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setUsersList(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Check Google Admin Session on Mount
  useEffect(() => {
    async function checkAdminSession() {
      try {
        const res = await fetch('/api/auth/google');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setAuthenticatedAdmin(data.user);
            fetchUsers();
          }
        }
      } catch (err) {
        console.error('Session check error:', err);
      } finally {
        setAuthChecking(false);
      }
    }
    checkAdminSession();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' })
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    setAuthenticatedAdmin(null);
    showToast('Signed out of Admin Console', 'success');
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!userForm.email || !userForm.email.includes('@')) {
      showToast('Please provide a valid email', 'error');
      return;
    }
    try {
      setSavingUser(true);
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to add user');
      }
      showToast('Admin user added successfully!');
      setIsUserModalOpen(false);
      setUserForm({ name: '', email: '', role: 'admin' });
      fetchUsers();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSavingUser(false);
    }
  };

  const handleToggleUserRole = async (targetUser) => {
    const nextRole = targetUser.role === 'super_admin' ? 'admin' : 'super_admin';
    const confirmMsg = targetUser.role === 'super_admin'
      ? `Are you sure you want to demote ${targetUser.name} to regular Admin? They will lose access to manage users.`
      : `Are you sure you want to promote ${targetUser.name} to Super Admin? They will gain full authority.`;

    if (!window.confirm(confirmMsg)) return;

    try {
      setUserActionLoadingId(targetUser.id);
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: targetUser.id, role: nextRole })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update role');
      }
      showToast(`Role updated to ${nextRole === 'super_admin' ? 'Super Admin' : 'Admin'}!`);
      fetchUsers();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUserActionLoadingId(null);
    }
  };

  const handleDeleteUser = async (targetUser) => {
    if (!window.confirm(`Are you sure you want to remove ${targetUser.name} (${targetUser.email}) from the admin panel? They will be removed immediately.`)) return;

    try {
      setUserActionLoadingId(targetUser.id);
      const res = await fetch(`/api/users?id=${targetUser.id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to remove user');
      }
      showToast(`User ${targetUser.name} removed successfully.`);
      fetchUsers();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUserActionLoadingId(null);
    }
  };

  // File Upload State for Teacher/Member Photo
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');
  const teacherFileInputRef = useRef(null);

  // File Upload State for Projects/Products
  const [isUploadingProjectImage, setIsUploadingProjectImage] = useState(false);
  const projectFileInputRef = useRef(null);
  const [isUploadingProductImage, setIsUploadingProductImage] = useState(false);
  const productFileInputRef = useRef(null);

  // ================= 1. PROJECTS (CASE STUDIES) STATE =================
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    id: '',
    num: '',
    title: '',
    category: 'Web Design & Development',
    description: '',
    image: '',
    liveUrl: '',
    isFeatured: true
  });

  // ================= 2. PRODUCTS (SOFTWARE WE OWN) STATE =================
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    banglaName: '',
    tag: '',
    image: '',
    description: '',
    features: [],
    liveUrl: '',
    status: 'Active Product'
  });
  const [productFeatureInput, setProductFeatureInput] = useState('');

  // ================= 3. SERVICES (WHAT YOU GET) STATE =================
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState({
    id: '',
    num: '',
    title: '',
    shortTitle: '',
    icon: 'Code2',
    pricing: 'From $599 per project',
    description: '',
    features: []
  });
  const [serviceFeatureInput, setServiceFeatureInput] = useState('');

  // ================= 4. TEAM & TEACHERS STATE =================
  const [team, setTeam] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState({
    id: '',
    name: '',
    role: '',
    department: 'Core Faculty & Mentorship',
    photo: '/images/rezhone-ceo.jpg',
    tagline: '',
    quote: '',
    bio: '',
    skills: [],
    experience: '5+ Years Experience',
    projectsCompleted: 50,
    isHighlighted: true
  });
  const [skillsInput, setSkillsInput] = useState('');

  // ================= 5. REVIEWS (CLIENT STORIES) STATE =================
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState({
    id: '',
    clientName: '',
    role: '',
    company: '',
    country: '',
    rating: 5,
    quote: '',
    avatar: '',
    metrics: ''
  });

  // ================= 6. GLOBAL SETTINGS STATE =================
  const [settings, setSettings] = useState({
    whatsappNumber: '',
    displayPhone: '',
    officialEmail: '',
    workingHours: '',
    officeAddress: '',
    tagline: '',
    ctaText: '',
    socials: {
      linkedin: '',
      facebook: '',
      github: '',
      twitter: '',
      instagram: ''
    }
  });
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);

  // Show Toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ================= FETCH DATA =================
  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      showToast('Failed to load projects', 'error');
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      showToast('Failed to load products', 'error');
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      showToast('Failed to load services', 'error');
    } finally {
      setLoadingServices(false);
    }
  };

  const fetchTeam = async () => {
    try {
      setLoadingTeam(true);
      const res = await fetch('/api/team');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setTeam(json.data);
      }
    } catch (err) {
      showToast('Failed to load team data', 'error');
    } finally {
      setLoadingTeam(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      showToast('Failed to load reviews', 'error');
    } finally {
      setLoadingReviews(false);
    }
  };

  const fetchSettings = async () => {
    try {
      setLoadingSettings(true);
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data && data.whatsappNumber) {
        setSettings(data);
      }
    } catch (err) {
      showToast('Failed to load settings', 'error');
    } finally {
      setLoadingSettings(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchProducts();
    fetchServices();
    fetchTeam();
    fetchReviews();
    fetchSettings();
  }, []);

  // ================= GENERAL UPLOAD HANDLER =================
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to upload file');
    }
    return data.url;
  };

  // ================= 1. PROJECT HANDLERS =================
  const handleOpenProjectModal = (proj = null) => {
    if (proj) {
      setCurrentProject(proj);
    } else {
      const nextIndex = projects.length + 1;
      setCurrentProject({
        id: '',
        num: `/00${nextIndex}/`,
        title: '',
        category: 'Web Design & Development',
        description: '',
        image: '/images/projects/web-development-showcase.webp',
        liveUrl: '',
        isFeatured: true
      });
    }
    setIsProjectModalOpen(true);
  };

  const handleProjectFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingProjectImage(true);
      const uploadedUrl = await uploadFile(file);
      setCurrentProject(prev => ({ ...prev, image: uploadedUrl }));
      showToast('Project image uploaded successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsUploadingProjectImage(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const isEditing = Boolean(currentProject.id);
      const url = '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProject)
      });

      if (!res.ok) throw new Error('Operation failed');
      showToast(isEditing ? 'Case study updated!' : 'New case study added!');
      setIsProjectModalOpen(false);
      fetchProjects();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteProject = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      showToast('Case study deleted successfully!');
      fetchProjects();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ================= 2. PRODUCT HANDLERS =================
  const handleOpenProductModal = (prod = null) => {
    if (prod) {
      setCurrentProduct(prod);
      setProductFeatureInput('');
    } else {
      setCurrentProduct({
        id: '',
        name: '',
        banglaName: '',
        tag: 'SaaS · Enterprise · Cloud',
        image: '/products/dalil-os.webp',
        description: '',
        features: ['Automated Operations', 'Real-time Analytics', 'Cloud Sync'],
        liveUrl: '',
        status: 'Active Product'
      });
      setProductFeatureInput('');
    }
    setIsProductModalOpen(true);
  };

  const handleProductFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingProductImage(true);
      const uploadedUrl = await uploadFile(file);
      setCurrentProduct(prev => ({ ...prev, image: uploadedUrl }));
      showToast('Product screenshot uploaded successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsUploadingProductImage(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleAddProductFeature = () => {
    if (!productFeatureInput.trim()) return;
    setCurrentProduct(prev => ({
      ...prev,
      features: [...(prev.features || []), productFeatureInput.trim()]
    }));
    setProductFeatureInput('');
  };

  const handleRemoveProductFeature = (index) => {
    setCurrentProduct(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const isEditing = Boolean(currentProduct.id);
      const url = '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct)
      });

      if (!res.ok) throw new Error('Operation failed');
      showToast(isEditing ? 'SaaS product updated!' : 'New SaaS product created!');
      setIsProductModalOpen(false);
      fetchProducts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      showToast('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ================= 3. SERVICE HANDLERS =================
  const handleOpenServiceModal = (srv = null) => {
    if (srv) {
      setCurrentService(srv);
      setServiceFeatureInput('');
    } else {
      const nextIndex = services.length + 1;
      setCurrentService({
        id: '',
        num: `/00${nextIndex}/`,
        title: '',
        shortTitle: '',
        icon: 'Code2',
        pricing: 'From $599 per project',
        description: '',
        features: ['Bespoke Architecture', 'High Velocity Delivery', 'SEO & Performance 95+']
      });
      setServiceFeatureInput('');
    }
    setIsServiceModalOpen(true);
  };

  const handleAddServiceFeature = () => {
    if (!serviceFeatureInput.trim()) return;
    setCurrentService(prev => ({
      ...prev,
      features: [...(prev.features || []), serviceFeatureInput.trim()]
    }));
    setServiceFeatureInput('');
  };

  const handleRemoveServiceFeature = (index) => {
    setCurrentService(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      const isEditing = Boolean(currentService.id);
      const url = '/api/services';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentService)
      });

      if (!res.ok) throw new Error('Operation failed');
      showToast(isEditing ? 'Service updated successfully!' : 'New service added!');
      setIsServiceModalOpen(false);
      fetchServices();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteService = async (id, title) => {
    if (!confirm(`Are you sure you want to delete service "${title}"?`)) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service');
      showToast('Service deleted successfully!');
      fetchServices();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ================= 4. TEACHERS & LEADERSHIP HANDLERS WITH FILE UPLOAD =================
  const handleOpenTeamModal = (member = null) => {
    if (member) {
      setCurrentMember(member);
      setPhotoPreview(member.photo || '/images/rezhone-ceo.jpg');
      setSkillsInput(Array.isArray(member.skills) ? member.skills.join(', ') : '');
    } else {
      const defaultPhoto = '/images/rezhone-ceo.jpg';
      setCurrentMember({
        id: '',
        name: '',
        role: 'Web Development Instructor & Lead',
        department: 'Core Faculty & Mentorship',
        photo: defaultPhoto,
        tagline: 'Empowering Next-Gen Engineers',
        quote: 'Learning through practical production architectures.',
        bio: 'Senior engineer and mentor coaching professionals in modern web frameworks.',
        skills: ['React', 'Next.js', 'TypeScript', 'System Architecture'],
        experience: '4+ Years Experience',
        projectsCompleted: 80,
        isHighlighted: true
      });
      setPhotoPreview(defaultPhoto);
      setSkillsInput('React, Next.js, TypeScript, System Architecture');
    }
    setIsTeamModalOpen(true);
  };

  // Teacher Photo File Upload
  const handleTeacherPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show immediate local preview
    try {
      const localUrl = URL.createObjectURL(file);
      setPhotoPreview(localUrl);
    } catch (err) {
      // fallback
    }

    try {
      setIsUploadingPhoto(true);
      const uploadedUrl = await uploadFile(file);
      setCurrentMember(prev => ({ ...prev, photo: uploadedUrl }));
      setPhotoPreview(uploadedUrl);
      showToast('Photo uploaded and linked successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsUploadingPhoto(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSelectQuickPhoto = (url) => {
    setCurrentMember(prev => ({ ...prev, photo: url }));
    setPhotoPreview(url);
    showToast('Photo selected!');
  };

  const handleSaveTeam = async (e) => {
    e.preventDefault();
    try {
      const skillsArr = skillsInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        ...currentMember,
        skills: skillsArr
      };

      const isEditing = Boolean(currentMember.id);
      const url = '/api/team';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Operation failed');
      showToast(isEditing ? 'Teacher/Leader profile updated!' : 'New profile added!');
      setIsTeamModalOpen(false);
      fetchTeam();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteTeam = async (id, name) => {
    if (!confirm(`Are you sure you want to delete profile "${name}"?`)) return;
    try {
      const res = await fetch(`/api/team?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete member');
      showToast('Profile deleted successfully!');
      fetchTeam();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ================= 5. REVIEW HANDLERS =================
  const handleOpenReviewModal = (rev = null) => {
    if (rev) {
      setCurrentReview(rev);
    } else {
      setCurrentReview({
        id: '',
        clientName: '',
        role: 'Founder & CEO',
        company: '',
        country: 'United States',
        rating: 5,
        quote: '',
        avatar: '/images/testimonials/avatar-1.webp',
        metrics: '+250% Conversion Increase'
      });
    }
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    try {
      const isEditing = Boolean(currentReview.id);
      const url = '/api/reviews';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentReview)
      });

      if (!res.ok) throw new Error('Operation failed');
      showToast(isEditing ? 'Review updated successfully!' : 'New review added!');
      setIsReviewModalOpen(false);
      fetchReviews();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteReview = async (id, clientName) => {
    if (!confirm(`Are you sure you want to delete review from "${clientName}"?`)) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete review');
      showToast('Review deleted successfully!');
      fetchReviews();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ================= 6. GLOBAL SETTINGS SAVE =================
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      setSavingSettings(true);
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (!res.ok) throw new Error('Failed to save settings');
      showToast('Global contact settings saved successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  // Google Authentication Gate
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-xs uppercase text-cyan-400">
        <div className="flex items-center gap-2.5 animate-pulse">
          <Loader2 size={16} className="animate-spin text-cyan-400" />
          <span>Verifying Admin Authorization...</span>
        </div>
      </div>
    );
  }

  if (!authenticatedAdmin) {
    return <AdminGoogleAuthModal onAuthenticated={(user) => setAuthenticatedAdmin(user)} />;
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#050505] text-[#f3f4f6] selection:bg-cyan-400 selection:text-black font-sans overflow-hidden">
      
      {/* 100% Exact FlowField Background matching Contact Section (Get in Touch) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FlowFieldCanvas
          color="#22d3ee"
          trailOpacity={0.15}
          particleCount={600}
          speed={0.5}
        />
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-lg border shadow-2xl backdrop-blur-md transition-all ${
            toast.type === 'error'
              ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
              : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
          }`}
        >
          <CheckCircle2 size={18} className="text-cyan-400" />
          <span className="text-xs font-mono tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Top Header - Matching Public Panel (Left: Brand Logo + Admin Badge, Right: Google Profile & View Live Website) */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#050505]/85 backdrop-blur-md">
        <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          
          {/* Left: Official Brand Wordmark + Admin Indicator */}
          <div className="flex items-center gap-4 sm:gap-6 select-none">
            <DrivenItWordmark className="h-8 w-auto sm:h-9" />
            <div className="h-5 w-px bg-white/10 hidden sm:block" />
            <span className="relative inline-flex items-center gap-2 bg-cyan-400/10 px-3 py-1 text-[11px] font-mono uppercase font-bold tracking-wider text-cyan-400 border border-cyan-400/25">
              <span>Admin Console</span>
              <CornerBrackets className="border-cyan-400/40" />
            </span>
          </div>

          {/* Right: Google Admin Profile + Sign Out + View Live Website */}
          <div className="flex items-center gap-3 sm:gap-4">
            {authenticatedAdmin && (
              <div className="flex items-center gap-2.5 sm:gap-3 border-r border-white/10 pr-3 sm:pr-4">
                {authenticatedAdmin.picture ? (
                  <img
                    src={authenticatedAdmin.picture}
                    alt={authenticatedAdmin.name}
                    className="h-8 w-8 rounded-full border border-cyan-400/50 object-cover shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center font-mono font-bold text-xs text-cyan-300">
                    {authenticatedAdmin.name ? authenticatedAdmin.name[0].toUpperCase() : 'A'}
                  </div>
                )}
                <div className="hidden md:flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-white truncate max-w-[130px]">
                      {authenticatedAdmin.name}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wider ${
                      authenticatedAdmin.role === 'super_admin'
                        ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                        : 'bg-white/10 text-white/70 border border-white/10'
                    }`}>
                      {authenticatedAdmin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400/90 truncate max-w-[140px]">
                    {authenticatedAdmin.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign Out of Admin Console"
                  className="group relative inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono uppercase bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
                >
                  <LogOut size={12} className="text-rose-400" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            )}

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 text-xs font-mono uppercase tracking-wider text-white transition-all duration-300 border border-white/10"
            >
              <span>View Live Website</span>
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-cyan-400" />
              <CornerBrackets className="border-white/30" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Control Banner matching Mollahs IT Aesthetic */}
      <div className="relative z-10 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <SectionBadge>Administration</SectionBadge>
              <h1 className="mt-5 text-[clamp(2.2rem,1.4rem+2.6vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em] text-white font-sans">
                Driven IT <span className="bg-logo-gradient bg-clip-text text-transparent">Control Hub</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-white/60 font-light italic max-w-2xl font-sans">
                Full-stack dynamic management across portfolio case studies, proprietary SaaS platforms, service packages, faculty &amp; leadership roster, client reviews, and global contact coordinates.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="relative inline-flex items-center gap-3 px-4 py-2.5 bg-white/[0.02] border border-white/10 font-mono text-xs text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>All 7 Sectors Fully Dynamic</span>
              <CornerBrackets className="border-white/20" />
            </div>
          </div>

          {/* 7 Section Tabs Styled Exact with Corner Brackets & Cyber Borders */}
          <div className="mt-10 flex flex-wrap gap-2.5 border-b border-white/5 pb-3">
            {[
              { id: 'projects', label: 'Case Studies', icon: Briefcase, count: projects.length },
              { id: 'products', label: 'Software We Own', icon: Cpu, count: products.length },
              { id: 'services', label: 'What You Get (Services)', icon: Layers, count: services.length },
              { id: 'team', label: 'Teachers & Leadership', icon: Users, count: team.length },
              { id: 'reviews', label: 'Client Stories', icon: Star, count: reviews.length },
              { id: 'settings', label: 'Get In Touch & Settings', icon: Settings },
              { id: 'users', label: 'Users & Roles', icon: ShieldCheck, count: usersList.length }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-2.5 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/40 shadow-[0_0_24px_rgba(0,229,255,0.18)]'
                      : 'bg-white/[0.02] text-white/70 hover:bg-white/[0.05] hover:text-white border border-white/5'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-cyan-400' : 'text-white/40 group-hover:text-white'} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-white/10 text-white/60'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  {isActive && <CornerBrackets className="border-cyan-400/50" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 pt-10 flex-1">

        {/* ========================================================= */}
        {/* TAB 1: CASE STUDIES (PROJECTS) */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold uppercase font-mono text-white flex items-center gap-2.5">
                  <Briefcase size={22} className="text-cyan-400" />
                  <span>Case Studies Management</span>
                </h2>
                <p className="text-xs text-white/50 font-sans mt-1">
                  Controls the sticky full-bleed stacking case study cards on the public homepage.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenProjectModal()}
                  className="group relative inline-flex items-center gap-2 bg-logo-gradient px-5 py-3 text-xs font-mono font-bold uppercase text-black hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                >
                  <Plus size={16} />
                  <span>Add New Case Study</span>
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </div>

            {loadingProjects ? (
              <div className="py-24 text-center text-xs font-mono uppercase text-white/40 animate-pulse">
                Loading Case Studies...
              </div>
            ) : projects.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-white/10 bg-white/[0.01]">
                <Briefcase size={40} className="mx-auto text-white/20 mb-3" />
                <p className="text-sm font-mono uppercase text-white/40">No case studies found</p>
                <button
                  onClick={() => handleOpenProjectModal()}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10"
                >
                  <Plus size={14} /> Add First Case Study
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="group relative border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md p-6 hover:border-cyan-400/40 transition-all duration-500 flex flex-col justify-between"
                  >
                    <CornerBrackets className="border-white/20 group-hover:border-cyan-400/40" />
                    <div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                        <span className="text-xs font-mono text-cyan-400 font-bold">{proj.num}</span>
                        <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 bg-white/5 text-white/80 border border-white/10">
                          {proj.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold uppercase font-mono text-white group-hover:text-cyan-400 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="mt-2 text-xs text-white/60 font-light italic font-sans line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-white/40">
                        <span>Image:</span>
                        <span className="truncate text-white/70 max-w-[280px]">{proj.image}</span>
                      </div>
                      {proj.liveUrl && (
                        <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-cyan-400">
                          <span>Live Link:</span>
                          <span className="truncate max-w-[280px] underline">{proj.liveUrl}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => handleOpenProjectModal(proj)}
                        className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                      >
                        <Pencil size={13} /> Edit
                        <CornerBrackets className="border-white/20" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.title)}
                        className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SOFTWARE WE OWN (PRODUCTS) */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold uppercase font-mono text-white flex items-center gap-2.5">
                  <Cpu size={22} className="text-cyan-400" />
                  <span>Software We Own (Proprietary SaaS)</span>
                </h2>
                <p className="text-xs text-white/50 font-sans mt-1">
                  Controls the 2-column SaaS products grid on the public homepage (Dalil OS, Cafe OS, etc.).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenProductModal()}
                  className="group relative inline-flex items-center gap-2 bg-logo-gradient px-5 py-3 text-xs font-mono font-bold uppercase text-black hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                >
                  <Plus size={16} />
                  <span>Add New SaaS Product</span>
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </div>

            {loadingProducts ? (
              <div className="py-24 text-center text-xs font-mono uppercase text-white/40 animate-pulse">
                Loading Products...
              </div>
            ) : products.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-white/10 bg-white/[0.01]">
                <Cpu size={40} className="mx-auto text-white/20 mb-3" />
                <p className="text-sm font-mono uppercase text-white/40">No software products found</p>
                <button
                  onClick={() => handleOpenProductModal()}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10"
                >
                  <Plus size={14} /> Add First Product
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="group relative border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md p-6 hover:border-cyan-400/40 transition-all duration-500 flex flex-col justify-between"
                  >
                    <CornerBrackets className="border-white/20 group-hover:border-cyan-400/40" />
                    <div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                        <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 bg-white/5 text-cyan-400 border border-cyan-400/25">
                          {prod.tag}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-white/40">
                          {prod.status || 'Active Product'}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-3">
                        <h3 className="text-2xl font-bold uppercase font-mono text-white group-hover:text-cyan-400 transition-colors">
                          {prod.name}
                        </h3>
                        {prod.banglaName && (
                          <span className="text-lg font-normal text-white/40">
                            {prod.banglaName}
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-xs text-white/60 font-light italic font-sans leading-relaxed">
                        {prod.description}
                      </p>

                      {/* Feature Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {Array.isArray(prod.features) && prod.features.map((feat, idx) => (
                          <span key={idx} className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-white/[0.03] text-white/80 border border-white/5">
                            #{feat}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1 text-[11px] font-mono text-white/40">
                        <div className="truncate">
                          <span className="text-white/30">Screenshot: </span>
                          <span className="text-white/70">{prod.image}</span>
                        </div>
                        {prod.liveUrl && (
                          <div className="truncate text-cyan-400">
                            <span className="text-white/30">Live Demo: </span>
                            <a href={prod.liveUrl} target="_blank" rel="noopener noreferrer" className="underline">
                              {prod.liveUrl}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => handleOpenProductModal(prod)}
                        className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                      >
                        <Pencil size={13} /> Edit
                        <CornerBrackets className="border-white/20" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: WHAT YOU GET (SERVICES) */}
        {/* ========================================================= */}
        {activeTab === 'services' && (
          <div>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold uppercase font-mono text-white flex items-center gap-2.5">
                  <Layers size={22} className="text-cyan-400" />
                  <span>Services Catalog (What You Get)</span>
                </h2>
                <p className="text-xs text-white/50 font-sans mt-1">
                  Controls the interactive services accordion and pricing cards on the public homepage.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenServiceModal()}
                  className="group relative inline-flex items-center gap-2 bg-logo-gradient px-5 py-3 text-xs font-mono font-bold uppercase text-black hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                >
                  <Plus size={16} />
                  <span>Add New Service</span>
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </div>

            {loadingServices ? (
              <div className="py-24 text-center text-xs font-mono uppercase text-white/40 animate-pulse">
                Loading Services...
              </div>
            ) : services.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-white/10 bg-white/[0.01]">
                <Layers size={40} className="mx-auto text-white/20 mb-3" />
                <p className="text-sm font-mono uppercase text-white/40">No services found</p>
                <button
                  onClick={() => handleOpenServiceModal()}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10"
                >
                  <Plus size={14} /> Add First Service
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="group relative border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md p-6 hover:border-cyan-400/40 transition-all duration-500 flex flex-col justify-between"
                  >
                    <CornerBrackets className="border-white/20 group-hover:border-cyan-400/40" />
                    <div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                        <span className="text-xs font-mono text-cyan-400 font-bold">{srv.num}</span>
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                          {srv.pricing}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold uppercase font-mono text-white group-hover:text-cyan-400 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="mt-2 text-xs text-white/60 font-light italic font-sans line-clamp-2 leading-relaxed">
                        {srv.description}
                      </p>

                      {/* Deliverables list */}
                      <div className="mt-4 space-y-1">
                        <p className="text-[10px] font-mono uppercase text-white/40">What we offer:</p>
                        {Array.isArray(srv.features) && srv.features.map((feat, idx) => (
                          <div key={idx} className="text-[11px] font-mono text-white/70 flex items-center gap-1.5">
                            <span className="text-cyan-400">▪</span> {feat}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => handleOpenServiceModal(srv)}
                        className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                      >
                        <Pencil size={13} /> Edit
                        <CornerBrackets className="border-white/20" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(srv.id, srv.title)}
                        className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: TEACHERS & LEADERSHIP (WHY CHOOSE US) */}
        {/* ========================================================= */}
        {activeTab === 'team' && (
          <div>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold uppercase font-mono text-white flex items-center gap-2.5">
                  <Users size={22} className="text-cyan-400" />
                  <span>Teachers &amp; Leadership (Why Choose Us)</span>
                </h2>
                <p className="text-xs text-white/50 font-sans mt-1">
                  Manage faculty, instructors, mentors, and leadership profiles. Photo can be selected/uploaded directly from files!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenTeamModal()}
                  className="group relative inline-flex items-center gap-2 bg-logo-gradient px-5 py-3 text-xs font-mono font-bold uppercase text-black hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                >
                  <Plus size={16} />
                  <span>Add New Teacher / Leader</span>
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </div>

            {loadingTeam ? (
              <div className="py-24 text-center text-xs font-mono uppercase text-white/40 animate-pulse">
                Loading Team &amp; Faculty...
              </div>
            ) : team.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-white/10 bg-white/[0.01]">
                <Users size={40} className="mx-auto text-white/20 mb-3" />
                <p className="text-sm font-mono uppercase text-white/40">No faculty members found</p>
                <button
                  onClick={() => handleOpenTeamModal()}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10"
                >
                  <Plus size={14} /> Add First Member
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="group relative border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md p-6 hover:border-cyan-400/40 transition-all duration-500 flex flex-col justify-between"
                  >
                    <CornerBrackets className="border-white/20 group-hover:border-cyan-400/40" />
                    <div>
                      {/* Photo & Basic info */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-slate-900 filter group-hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.25)] transition-all">
                          {/* Use standard img for dynamic direct URL support */}
                          <img
                            src={member.photo || '/images/rezhone-ceo.jpg'}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold uppercase font-mono text-white truncate group-hover:text-cyan-400 transition-colors">
                            {member.name}
                          </h3>
                          <p className="text-xs text-cyan-400 font-mono truncate">
                            {member.role}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-mono uppercase px-2 py-0.5 bg-white/5 text-white/60 rounded border border-white/5">
                            {member.experience || '5+ Years Exp'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-white/5 pt-3">
                        <p className="text-[11px] text-white/40 font-mono uppercase">
                          {member.department || 'CORE FACULTY'}
                        </p>
                        <p className="text-xs text-white/70 italic font-sans leading-relaxed line-clamp-3">
                          &ldquo;{member.quote || member.bio}&rdquo;
                        </p>

                        {/* Skills badges */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {Array.isArray(member.skills) && member.skills.slice(0, 4).map((sk, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.03] text-white/80 border border-white/5">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className={`text-[10px] font-mono uppercase ${
                        member.isHighlighted !== false ? 'text-emerald-400' : 'text-white/40'
                      }`}>
                        {member.isHighlighted !== false ? '● Visible in Why Choose Us' : '○ Hidden'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenTeamModal(member)}
                          className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                        >
                          <Pencil size={13} /> Edit
                          <CornerBrackets className="border-white/20" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeam(member.id, member.name)}
                          className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: CLIENT STORIES (REVIEWS) */}
        {/* ========================================================= */}
        {activeTab === 'reviews' && (
          <div>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold uppercase font-mono text-white flex items-center gap-2.5">
                  <Star size={22} className="text-cyan-400" />
                  <span>Client Stories (Reviews)</span>
                </h2>
                <p className="text-xs text-white/50 font-sans mt-1">
                  Controls the founder testimonials and reviews slider on the public homepage.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenReviewModal()}
                  className="group relative inline-flex items-center gap-2 bg-logo-gradient px-5 py-3 text-xs font-mono font-bold uppercase text-black hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                >
                  <Plus size={16} />
                  <span>Add New Review</span>
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </div>

            {loadingReviews ? (
              <div className="py-24 text-center text-xs font-mono uppercase text-white/40 animate-pulse">
                Loading Client Reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-white/10 bg-white/[0.01]">
                <Star size={40} className="mx-auto text-white/20 mb-3" />
                <p className="text-sm font-mono uppercase text-white/40">No reviews found</p>
                <button
                  onClick={() => handleOpenReviewModal()}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10"
                >
                  <Plus size={14} /> Add First Review
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="group relative border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md p-6 hover:border-cyan-400/40 transition-all duration-500 flex flex-col justify-between"
                  >
                    <CornerBrackets className="border-white/20 group-hover:border-cyan-400/40" />
                    <div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(Number(rev.rating) || 5)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>
                        {rev.country && (
                          <span className="text-[11px] font-mono text-white/50">
                            {rev.country}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-white/80 font-light italic font-sans leading-relaxed line-clamp-4">
                        &ldquo;{rev.quote}&rdquo;
                      </p>

                      {rev.metrics && (
                        <div className="mt-3 inline-block px-2.5 py-0.5 bg-cyan-400/10 text-cyan-400 border border-cyan-400/25 text-[10px] font-mono font-semibold">
                          {rev.metrics}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold uppercase font-mono text-white">
                          {rev.clientName}
                        </h4>
                        <p className="text-[11px] text-white/50 font-mono">
                          {rev.role} {rev.company ? `· ${rev.company}` : ''}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenReviewModal(rev)}
                          className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                        >
                          <Pencil size={13} /> Edit
                          <CornerBrackets className="border-white/20" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id, rev.clientName)}
                          className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: GET IN TOUCH & GLOBAL SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 border-b border-white/5 pb-4">
              <h2 className="text-2xl font-bold uppercase font-mono text-white flex items-center gap-2.5">
                <Settings size={22} className="text-cyan-400" />
                <span>Get In Touch &amp; Global Site Settings</span>
              </h2>
              <p className="text-xs text-white/50 font-sans mt-1">
                Updating these coordinates will automatically update the floating WhatsApp button, header quick chat, contact page, and footer across the whole website.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-8">
              {/* WhatsApp & Phone Coordinates */}
              <div className="relative border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md p-6 sm:p-8 space-y-6">
                <CornerBrackets className="border-white/30" />
                <h3 className="text-sm font-mono uppercase text-cyan-400 font-bold flex items-center gap-2">
                  <Phone size={16} />
                  <span>WhatsApp &amp; Direct Phone Coordinates</span>
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      WhatsApp Raw Number (No +, No spaces, No dashes)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="8801909711808"
                      value={settings.whatsappNumber || ''}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 font-mono text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                    <p className="mt-1.5 text-[11px] text-white/40 font-mono">
                      Controls floating WhatsApp button &amp; header chat. Example: 8801909711808
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      Display Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+880 1909-711808"
                      value={settings.displayPhone || ''}
                      onChange={(e) => setSettings({ ...settings, displayPhone: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 font-mono text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                    <p className="mt-1.5 text-[11px] text-white/40 font-mono">
                      Formatted phone shown on Contact cards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Email & Working Hours */}
              <div className="relative border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md p-6 sm:p-8 space-y-6">
                <CornerBrackets className="border-white/30" />
                <h3 className="text-sm font-mono uppercase text-cyan-400 font-bold flex items-center gap-2">
                  <Mail size={16} />
                  <span>Official Email &amp; Operation Hours</span>
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="drivenitsolution@gmail.com"
                      value={settings.officialEmail || ''}
                      onChange={(e) => setSettings({ ...settings, officialEmail: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 font-mono text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      Working Hours / WhatsApp Status
                    </label>
                    <input
                      type="text"
                      placeholder="Mon-Fri from 8am to 6pm (Official WhatsApp Active)"
                      value={settings.workingHours || ''}
                      onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 font-mono text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                    Physical / HQ Address
                  </label>
                  <input
                    type="text"
                    placeholder="Dhaka, Bangladesh · Remote-First Worldwide"
                    value={settings.officeAddress || ''}
                    onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/10 font-mono text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Social Media Links */}
              <div className="relative border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md p-6 sm:p-8 space-y-6">
                <CornerBrackets className="border-white/30" />
                <h3 className="text-sm font-mono uppercase text-cyan-400 font-bold flex items-center gap-2">
                  <Globe size={16} />
                  <span>Social Media Profiles</span>
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com"
                      value={settings.socials?.linkedin || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        socials: { ...settings.socials, linkedin: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 font-mono text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://facebook.com"
                      value={settings.socials?.facebook || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        socials: { ...settings.socials, facebook: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 font-mono text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com"
                      value={settings.socials?.github || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        socials: { ...settings.socials, github: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 font-mono text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-white/70 mb-2">
                      X / Twitter URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://x.com"
                      value={settings.socials?.twitter || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        socials: { ...settings.socials, twitter: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 font-mono text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-logo-gradient text-black font-mono font-bold text-xs uppercase hover:opacity-95 transition-opacity cursor-pointer shadow-[0_0_30px_rgba(0,229,255,0.3)] disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{savingSettings ? 'Saving Settings...' : 'Save & Publish Global Settings'}</span>
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* 7. USERS & ROLES / ACCESS CONTROL (SUPER ADMIN & ADMINS)   */}
        {/* ========================================================= */}
        {activeTab === 'users' && (
          <div>
            {/* Top Toolbar */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold uppercase font-mono text-white flex items-center gap-2.5">
                  <ShieldCheck size={22} className="text-cyan-400" />
                  <span>Users & Access Control</span>
                </h2>
                <p className="text-xs text-white/50 font-sans mt-1">
                  Manage administrators, permission levels (Super Admin vs Admin), and active Google login accounts.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {authenticatedAdmin?.role === 'super_admin' ? (
                  <button
                    onClick={() => {
                      setUserForm({ name: '', email: '', role: 'admin' });
                      setIsUserModalOpen(true);
                    }}
                    className="group relative inline-flex items-center gap-2 bg-logo-gradient px-5 py-3 text-xs font-mono font-bold uppercase text-black hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                  >
                    <UserPlus size={16} />
                    <span>Add New Administrator</span>
                    <CornerBrackets className="border-black/40" />
                  </button>
                ) : (
                  <span className="px-3.5 py-2 text-xs font-mono text-white/50 bg-white/5 border border-white/10 flex items-center gap-2">
                    <Lock size={13} />
                    <span>View Only (Super Admin Required to Modify)</span>
                  </span>
                )}
              </div>
            </div>

            {/* Permission Matrix Info Cards */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="relative border border-cyan-500/30 bg-cyan-950/20 p-5 font-mono text-xs text-white">
                <CornerBrackets className="border-cyan-400/40" />
                <div className="flex items-center gap-2 font-bold text-cyan-400 uppercase text-xs mb-2">
                  <Crown size={15} />
                  <span>Super Admin Privilege Level</span>
                </div>
                <p className="text-[11px] text-white/70 font-sans leading-relaxed">
                  Has 100% full authority across the entire platform. Can add new administrators, promote or demote roles, kick/remove users from the admin panel, and edit all website sectors.
                </p>
              </div>

              <div className="relative border border-white/10 bg-white/[0.02] p-5 font-mono text-xs text-white">
                <CornerBrackets className="border-white/20" />
                <div className="flex items-center gap-2 font-bold text-white/80 uppercase text-xs mb-2">
                  <Shield size={15} className="text-slate-400" />
                  <span>Admin Privilege Level</span>
                </div>
                <p className="text-[11px] text-white/60 font-sans leading-relaxed">
                  Standard operational access. Can view the system and edit content sectors, but <strong className="text-white">CANNOT</strong> add users, remove administrators, or alter permission levels.
                </p>
              </div>
            </div>

            {/* Users Roster List / Cards */}
            {loadingUsers ? (
              <div className="py-24 text-center text-xs font-mono uppercase text-white/40 animate-pulse flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin text-cyan-400" />
                <span>Loading Administrative Personnel Directory...</span>
              </div>
            ) : usersList.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-white/10 bg-white/[0.01]">
                <Users size={40} className="mx-auto text-white/20 mb-3" />
                <p className="text-sm font-mono uppercase text-white/40">No administrators found</p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {usersList.map((usr) => {
                  const isCurrent = usr.email?.toLowerCase() === authenticatedAdmin?.email?.toLowerCase();
                  const isUserSuper = usr.role === 'super_admin';
                  const isActionLoading = userActionLoadingId === usr.id;

                  return (
                    <div
                      key={usr.id}
                      className={`group relative border bg-[#0c0c0c]/90 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 ${
                        isUserSuper ? 'border-cyan-500/30 hover:border-cyan-400/60' : 'border-white/10 hover:border-white/25'
                      }`}
                    >
                      <CornerBrackets className={isUserSuper ? 'border-cyan-400/40' : 'border-white/20'} />

                      <div>
                        {/* Top Profile Header */}
                        <div className="flex items-start gap-4 mb-5">
                          <div className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden border border-white/15 bg-slate-900 shadow-md">
                            <img
                              src={usr.picture || 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin'}
                              alt={usr.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold font-mono text-white truncate">
                                {usr.name}
                              </h3>
                              {isCurrent && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                                  You
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/50 font-mono truncate mt-0.5">
                              {usr.email}
                            </p>

                            {/* Role Badge */}
                            <div className="mt-2.5 flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase font-bold tracking-wider ${
                                  isUserSuper
                                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                                    : 'bg-white/5 text-white/80 border border-white/15'
                                }`}
                              >
                                {isUserSuper ? <Crown size={12} className="text-cyan-400" /> : <Shield size={12} className="text-white/60" />}
                                <span>{isUserSuper ? 'Super Admin' : 'Admin'}</span>
                              </span>

                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>Active</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Telemetry / Log details */}
                        <div className="border-t border-white/5 pt-3.5 space-y-1.5 text-[11px] font-mono">
                          <div className="flex justify-between text-white/40">
                            <span>Account Added:</span>
                            <span className="text-white/70">
                              {usr.createdAt ? new Date(usr.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Initial'}
                            </span>
                          </div>
                          <div className="flex justify-between text-white/40">
                            <span>Last Google Login:</span>
                            <span className="text-cyan-400/90 truncate max-w-[170px]">
                              {usr.lastLogin ? new Date(usr.lastLogin).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Never logged in'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Controls for Super Admin */}
                      <div className="mt-5 border-t border-white/5 pt-3.5 flex items-center justify-between gap-2">
                        {authenticatedAdmin?.role === 'super_admin' ? (
                          <>
                            {/* Toggle Role Button */}
                            <button
                              disabled={isActionLoading || isCurrent}
                              onClick={() => handleToggleUserRole(usr)}
                              title={isCurrent ? 'You cannot change your own role' : `Change to ${isUserSuper ? 'regular Admin' : 'Super Admin'}`}
                              className={`flex-1 px-3 py-2 text-[10px] font-mono uppercase font-bold border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                isUserSuper
                                  ? 'bg-white/5 hover:bg-white/10 text-white/80 border-white/15'
                                  : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                              }`}
                            >
                              {isUserSuper ? 'Demote to Admin' : 'Promote to Super Admin'}
                            </button>

                            {/* Remove / Kick User Button */}
                            <button
                              disabled={isActionLoading || isCurrent}
                              onClick={() => handleDeleteUser(usr)}
                              title={isCurrent ? 'You cannot remove yourself' : 'Remove from Admin Panel'}
                              className="px-3 py-2 text-[10px] font-mono uppercase font-bold bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                            >
                              <Trash2 size={12} className="text-rose-400" />
                              <span>Remove</span>
                            </button>
                          </>
                        ) : (
                          <div className="w-full text-center py-1 text-[10px] font-mono uppercase text-white/40 italic">
                            Super Admin Protected
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* DEDICATED ADMIN FOOTER SECTION (MATCHING PUBLIC PANEL 1:1) */}
      {/* 100% Solid background bg-[#050505] with z-20 so ZERO particles/animation show here */}
      {/* ========================================================= */}
      <footer className="relative z-20 border-t border-white/5 bg-[#050505] overflow-hidden mt-32 w-full">
        {/* Ambient Blue Radial Glow at Bottom matching Public Panel Footer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-logo-glow blur-[120px] -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 opacity-40 z-0"
        />

        <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
          {/* Massive Background Watermark Wordmark matching Mollahs IT & Public Panel Footer */}
          <div className="w-full select-none opacity-[0.16] [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)] pointer-events-none">
            <svg
              viewBox="0 0 3160 404"
              className="w-full h-auto select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Driven IT Solution"
            >
              <defs>
                <linearGradient id="adminDitRibbon1" x1="0" y1="0" x2="0.6" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="50%" stopColor="#02A7F4" />
                  <stop offset="100%" stopColor="#027BE6" />
                </linearGradient>
                <linearGradient id="adminDitRibbon2" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0279E5" />
                  <stop offset="50%" stopColor="#02B8FA" />
                  <stop offset="100%" stopColor="#00E5FF" />
                </linearGradient>
                <linearGradient id="adminDitItGrad" x1="0" y1="0" x2="0.8" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="60%" stopColor="#02B8FA" />
                  <stop offset="100%" stopColor="#0277E4" />
                </linearGradient>
              </defs>

              {/* 3D Ribbon 'D' Monogram */}
              <g id="adminMonogram">
                <rect x="40" y="38" width="90" height="328" rx="24" fill="url(#adminDitRibbon1)" />
                <path
                  d="M 95 38 C 270 38 420 108 420 202 C 420 296 270 366 95 366 C 165 366 315 308 315 202 C 315 96 165 38 95 38 Z"
                  fill="url(#adminDitRibbon2)"
                />
                <path
                  d="M 140 116 C 228 116 290 154 290 202 C 290 250 228 288 140 288 Z"
                  fill="#040e1a"
                  opacity="0.95"
                />
                <path
                  d="M 130 126 C 205 136 260 166 260 202 C 260 238 205 268 130 278 Z"
                  fill="url(#adminDitRibbon1)"
                  opacity="0.6"
                />
                <path
                  d="M 95 40 C 265 40 412 110 412 202 C 412 294 265 364 95 364"
                  stroke="#00E5FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.5"
                  fill="none"
                />
              </g>

              {/* Brand Typography */}
              {/* RIVEN in crisp bold white */}
              <text
                x="460"
                y="298"
                fill="#FFFFFF"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', Segoe UI, Roboto, sans-serif"
                fontSize="280"
                fontWeight="900"
                letterSpacing="-0.03em"
              >
                RIVEN
              </text>

              {/* IT in electric cyan gradient */}
              <text
                x="1400"
                y="298"
                fill="url(#adminDitItGrad)"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', Segoe UI, Roboto, sans-serif"
                fontSize="280"
                fontWeight="900"
                letterSpacing="-0.02em"
              >
                IT
              </text>

              {/* SOLUTION in electric cyan gradient */}
              <text
                x="1760"
                y="298"
                fill="url(#adminDitItGrad)"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', Segoe UI, Roboto, sans-serif"
                fontSize="280"
                fontWeight="900"
                letterSpacing="-0.025em"
              >
                SOLUTION
              </text>
            </svg>
          </div>

          {/* Bottom Copyright Bar matching Public Panel Footer */}
          <div className="flex flex-col justify-between items-center gap-3 border-t border-white/5 py-6 text-[11px] font-sans font-light italic uppercase text-white/40 sm:flex-row">
            <span>&copy; 2026 DRIVEN IT SOLUTION. BUILT FOR THE AGENTIC ERA.</span>
            <span className="text-white/60 inline-flex items-center gap-1.5">
              <span>DEVELOPED BY</span>
              <span className="text-cyan-400 font-medium not-italic">ABIR SHIKDAR</span>
            </span>
            <span>REMOTE-FIRST · WORKING ACROSS TIMEZONES</span>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* MODAL 1: ADD / EDIT CASE STUDY */}
      {/* ========================================================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0c0c0e] border border-cyan-500/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <CornerBrackets className="border-cyan-400/50" />
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold uppercase font-mono text-white mb-6">
              {currentProject.id ? 'Edit Case Study' : 'Add New Case Study'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Number Tag (e.g. /001/)
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProject.num}
                    onChange={(e) => setCurrentProject({ ...currentProject, num: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Category
                  </label>
                  <select
                    value={currentProject.category}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Web Design & Development">Web Design &amp; Development</option>
                    <option value="AI & Meta Ad Expert">AI &amp; Meta Ad Expert</option>
                    <option value="Graphics Designing">Graphics Designing</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Custom Software">Custom Software</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nexus Enterprise Platform"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what was engineered and results achieved..."
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-sans text-xs text-white resize-none focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Image with file upload */}
              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Showcase Mockup Image
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    placeholder="/images/projects/web-development-showcase.webp"
                    value={currentProject.image}
                    onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                    className="flex-1 px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={projectFileInputRef}
                    onChange={handleProjectFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => projectFileInputRef.current?.click()}
                    disabled={isUploadingProjectImage}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase cursor-pointer border border-white/10 flex items-center gap-1.5"
                  >
                    {isUploadingProjectImage ? <Loader2 size={13} className="animate-spin" /> : <UploadCloud size={13} />}
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Live Site Visit Link (Leave empty if showcase only)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={currentProject.liveUrl || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="relative px-6 py-2.5 bg-logo-gradient text-black font-mono font-bold text-xs uppercase hover:opacity-95 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                >
                  Save Case Study
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD / EDIT PROPRIETARY SOFTWARE */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0c0c0e] border border-cyan-500/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <CornerBrackets className="border-cyan-400/50" />
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold uppercase font-mono text-white mb-6">
              {currentProduct.id ? 'Edit SaaS Product' : 'Add New SaaS Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Software Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dalil OS"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Bangla Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. দলিল OS"
                    value={currentProduct.banglaName || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, banglaName: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Tag / Industry Category
                </label>
                <input
                  type="text"
                  required
                  placeholder="SaaS · Legal-tech · Bangladesh"
                  value={currentProduct.tag}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, tag: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what the platform does and for whom..."
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-sans text-xs text-white resize-none focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Feature bullet points */}
              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Key Features / Deliverables
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type feature (e.g. Cloud POS & Analytics)"
                    value={productFeatureInput}
                    onChange={(e) => setProductFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddProductFeature();
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddProductFeature}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase cursor-pointer border border-white/10"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentProduct.features.map((feat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 text-white/80 border border-white/10 text-[11px] font-mono">
                      <span>#{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProductFeature(idx)}
                        className="text-white/40 hover:text-rose-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Screenshot Path / File
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="/products/cafe-os.png"
                      value={currentProduct.image}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                      className="flex-1 px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      ref={productFileInputRef}
                      onChange={handleProductFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => productFileInputRef.current?.click()}
                      disabled={isUploadingProductImage}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase cursor-pointer border border-white/10 flex items-center gap-1"
                    >
                      {isUploadingProductImage ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={12} />}
                      <span>Upload</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://dalilos.com"
                    value={currentProduct.liveUrl || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="relative px-6 py-2.5 bg-logo-gradient text-black font-mono font-bold text-xs uppercase hover:opacity-95 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                >
                  Save Product
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ADD / EDIT SERVICE */}
      {/* ========================================================= */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0c0c0e] border border-cyan-500/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <CornerBrackets className="border-cyan-400/50" />
            <button
              onClick={() => setIsServiceModalOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold uppercase font-mono text-white mb-6">
              {currentService.id ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Number Tag
                  </label>
                  <input
                    type="text"
                    required
                    value={currentService.num}
                    onChange={(e) => setCurrentService({ ...currentService, num: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Pricing Text
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="From $599 per project"
                    value={currentService.pricing}
                    onChange={(e) => setCurrentService({ ...currentService, pricing: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Web Design & Development"
                  value={currentService.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCurrentService({
                      ...currentService,
                      title: val,
                      shortTitle: currentService.shortTitle || val
                    });
                  }}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Short Title (Vertical tab)
                  </label>
                  <input
                    type="text"
                    required
                    value={currentService.shortTitle || currentService.title}
                    onChange={(e) => setCurrentService({ ...currentService, shortTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Display Icon
                  </label>
                  <select
                    value={currentService.icon || 'Code2'}
                    onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Code2">Code2 (Engineering)</option>
                    <option value="Palette">Palette (Creative &amp; Graphics)</option>
                    <option value="Target">Target (AI &amp; Meta Ads)</option>
                    <option value="Megaphone">Megaphone (Digital Marketing)</option>
                    <option value="LayoutDashboard">LayoutDashboard (Custom App/SaaS)</option>
                    <option value="Globe">Globe (Next.js Global Web)</option>
                    <option value="Smartphone">Smartphone (Mobile Apps)</option>
                    <option value="Cpu">Cpu (AI Solutions)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={currentService.description}
                  onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-sans text-xs text-white resize-none focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* What We Offer (Deliverables list) */}
              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Deliverables &amp; Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type deliverable (e.g. CMS & E-Commerce)"
                    value={serviceFeatureInput}
                    onChange={(e) => setServiceFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddServiceFeature();
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddServiceFeature}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase cursor-pointer border border-white/10"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentService.features.map((feat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 text-white/80 border border-white/10 text-[11px] font-mono">
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveServiceFeature(idx)}
                        className="text-white/40 hover:text-rose-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="relative px-6 py-2.5 bg-logo-gradient text-black font-mono font-bold text-xs uppercase hover:opacity-95 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                >
                  Save Service
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: ADD / EDIT TEACHER & LEADERSHIP WITH PHOTO FILE SELECT */}
      {/* ========================================================= */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0c0c0e] border border-cyan-500/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto">
            <CornerBrackets className="border-cyan-400/50" />
            <button
              onClick={() => setIsTeamModalOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold uppercase font-mono text-white mb-6">
              {currentMember.id ? 'Edit Teacher / Leader' : 'Add New Teacher / Leader'}
            </h3>

            <form onSubmit={handleSaveTeam} className="space-y-5">
              
              {/* Photo Upload & Preview Box (Direct File Select Feature) */}
              <div className="border border-cyan-400/25 bg-cyan-950/15 p-5 relative">
                <CornerBrackets className="border-cyan-400/40" />
                <label className="block text-xs font-mono uppercase text-cyan-400 font-bold mb-3 flex items-center gap-2">
                  <ImageIcon size={15} />
                  <span>Teacher / Instructor Photo (Choose from Device)</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Avatar Preview */}
                  <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden border-2 border-cyan-400/40 bg-slate-950 shadow-[0_0_24px_rgba(0,229,255,0.25)] flex items-center justify-center">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt={currentMember.name || 'Preview'}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={32} className="text-white/20" />
                    )}
                  </div>

                  {/* Upload Action */}
                  <div className="flex-1 w-full flex flex-col gap-2.5">
                    <input
                      type="file"
                      accept="image/*"
                      ref={teacherFileInputRef}
                      onChange={handleTeacherPhotoUpload}
                      className="hidden"
                      id="teacher-file-input"
                    />

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => teacherFileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-logo-gradient text-black font-mono font-bold text-xs uppercase cursor-pointer hover:opacity-95 shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-all disabled:opacity-50"
                      >
                        {isUploadingPhoto ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            <span>Uploading photo...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud size={14} />
                            <span>Select Photo from File</span>
                          </>
                        )}
                        <CornerBrackets className="border-black/40" />
                      </button>

                      {currentMember.photo && (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/20 rounded">
                          <CheckCircle2 size={13} /> Photo Active
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-white/50 font-sans">
                      Click button to pick any photo (JPG, PNG, WEBP) from your computer or phone.
                    </p>

                    {/* Quick presets from Docs / existing files */}
                    <div className="mt-1 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                        Or Pick Existing Team / Docs Photo:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { label: 'Rezhone CEO', url: '/images/rezhone-ceo.jpg' },
                          { label: 'Jakia Co-founder', url: '/images/jakia-cofounder.jpg' },
                          { label: 'Doc Logo / Team', url: '/images/driven-logo-badge.png' }
                        ].map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => handleSelectQuickPhoto(preset.url)}
                            className="px-2 py-0.5 text-[10px] font-mono bg-white/5 hover:bg-cyan-400/20 text-white/70 hover:text-cyan-300 border border-white/10 rounded cursor-pointer transition-colors"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Manual Path / URL fallback input */}
                    <div className="mt-1">
                      <input
                        type="text"
                        placeholder="Image URL or Path (/images/...)"
                        value={currentMember.photo || ''}
                        onChange={(e) => {
                          setCurrentMember({ ...currentMember, photo: e.target.value });
                          setPhotoPreview(e.target.value);
                        }}
                        className="w-full px-3 py-1.5 bg-black/60 border border-white/10 font-mono text-[11px] text-white/80 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Name and Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharafat Islam"
                    value={currentMember.name}
                    onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Graphic Designer"
                    value={currentMember.role}
                    onChange={(e) => setCurrentMember({ ...currentMember, role: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Department / Specialty
                  </label>
                  <input
                    type="text"
                    placeholder="Creative Studio"
                    value={currentMember.department || ''}
                    onChange={(e) => setCurrentMember({ ...currentMember, department: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Experience Badge
                  </label>
                  <input
                    type="text"
                    placeholder="3+ Years Experience"
                    value={currentMember.experience || ''}
                    onChange={(e) => setCurrentMember({ ...currentMember, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Tagline / Header Card Title
                </label>
                <input
                  type="text"
                  placeholder="Visual Identity & Aesthetic Direction"
                  value={currentMember.tagline || ''}
                  onChange={(e) => setCurrentMember({ ...currentMember, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Quote / Teaching Philosophy
                </label>
                <textarea
                  rows={2}
                  placeholder="Transforming brand concepts into unforgettable visual masterpieces..."
                  value={currentMember.quote || ''}
                  onChange={(e) => setCurrentMember({ ...currentMember, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-sans text-xs text-white resize-none focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Skills (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="Brand Identity Design, Figma, Adobe Suite, Vector Graphics"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isHighlighted"
                  checked={currentMember.isHighlighted !== false}
                  onChange={(e) => setCurrentMember({ ...currentMember, isHighlighted: e.target.checked })}
                  className="rounded bg-black border-white/20 text-cyan-400 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isHighlighted" className="text-xs font-mono text-white/80 cursor-pointer">
                  Feature card on Homepage (&quot;Why Choose Us&quot;)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="relative px-6 py-2.5 bg-logo-gradient text-black font-mono font-bold text-xs uppercase hover:opacity-95 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                >
                  Save Profile
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: ADD / EDIT CLIENT REVIEW */}
      {/* ========================================================= */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0c0c0e] border border-cyan-500/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <CornerBrackets className="border-cyan-400/50" />
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold uppercase font-mono text-white mb-6">
              {currentReview.id ? 'Edit Review' : 'Add New Client Story'}
            </h3>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={currentReview.clientName}
                    onChange={(e) => setCurrentReview({ ...currentReview, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Role &amp; Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Co-founder, Nexus Capital"
                    value={currentReview.role}
                    onChange={(e) => setCurrentReview({ ...currentReview, role: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Country / Location
                  </label>
                  <input
                    type="text"
                    placeholder="United States"
                    value={currentReview.country || ''}
                    onChange={(e) => setCurrentReview({ ...currentReview, country: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={currentReview.rating}
                    onChange={(e) => setCurrentReview({ ...currentReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Full Testimonial Quote
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="What did the client say about our velocity and architecture?"
                  value={currentReview.quote}
                  onChange={(e) => setCurrentReview({ ...currentReview, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-sans text-xs text-white resize-none focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Key Metric / Result Tag (Optional)
                </label>
                <input
                  type="text"
                  placeholder="+340% Conversions · 99.9% Uptime"
                  value={currentReview.metrics || ''}
                  onChange={(e) => setCurrentReview({ ...currentReview, metrics: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="relative px-6 py-2.5 bg-logo-gradient text-black font-mono font-bold text-xs uppercase hover:opacity-95 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                >
                  Save Review
                  <CornerBrackets className="border-black/40" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD NEW ADMINISTRATOR (SUPER ADMIN ONLY)           */}
      {/* ========================================================= */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md border border-white/10 bg-[#0c0c0c] p-6 sm:p-8 shadow-2xl">
            <CornerBrackets className="border-cyan-400/50" />
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h3 className="text-lg font-bold uppercase font-mono text-white flex items-center gap-2">
                <UserPlus size={18} className="text-cyan-400" />
                <span>Add Administrator</span>
              </h3>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4 font-mono">
              <div>
                <label className="block text-xs uppercase text-white/70 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharafat Islam"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-white/70 mb-1.5">
                  Google Account Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sharafat.drivenit@gmail.com"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <p className="text-[10px] text-white/40 font-sans mt-1">
                  They will use this exact Gmail address when clicking &ldquo;Sign in with Google&rdquo;.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase text-white/70 mb-1.5">
                  Assigned Administrative Role
                </label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="admin">Admin (Standard Content Operations)</option>
                  <option value="super_admin">Super Admin (Full Authority + User Management)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-6">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2.5 text-xs uppercase text-white/60 hover:text-white border border-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingUser}
                  className="px-5 py-2.5 text-xs font-bold uppercase bg-logo-gradient text-black hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                >
                  {savingUser ? 'Adding...' : 'Save & Grant Access'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
