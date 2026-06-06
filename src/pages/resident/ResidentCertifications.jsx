import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Award, BookOpen } from 'lucide-react';
import TrackBadge from '@/components/ui/TrackBadge';
import { Link } from 'react-router-dom';

const trackColors = {
  ai_tech: '#3B82F6',
  physical_trades: '#F97316',
  life_skills: '#22C55E',
};

export default function ResidentCertifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Resident.list('-created_date', 1).then(async ([r]) => {
      if (!r) { setLoading(false); return; }
      const c = await base44.entities.Certification.filter({ resident_id: r.id });
      setCerts(c);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-black text-4xl">CERTIFICATIONS</h1>
        <p className="text-muted-foreground mt-1">{certs.length} earned — your proof of mastery.</p>
      </div>

      {certs.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center border border-border/50">
          <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-bold text-2xl mb-2">No Certifications Yet</h3>
          <p className="text-muted-foreground mb-6">Complete certifying courses to earn your first badge.</p>
          <Link to="/resident/courses" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold glow-btn text-sm">
            <BookOpen className="w-4 h-4" /> Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map(cert => {
            const color = trackColors[cert.track] || '#3B82F6';
            return (
              <div key={cert.id} className="glass rounded-2xl border p-6 text-center" style={{ borderColor: `${color}30` }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${color}20`, border: `2px solid ${color}40` }}>
                  <Award className="w-8 h-8" style={{ color }} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{cert.certification_name}</h3>
                {cert.track && <TrackBadge track={cert.track} />}
                <div className="text-muted-foreground text-xs mt-3">Issued: {cert.issued_date}</div>
                {cert.nac_bonus_awarded > 0 && (
                  <div className="mt-2 text-xs font-semibold" style={{ color }}>+{cert.nac_bonus_awarded} NAC earned</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}