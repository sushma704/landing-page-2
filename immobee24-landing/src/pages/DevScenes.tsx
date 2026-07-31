// Internal review route (/dev/scenes, noindex): renders all seven product
// scenario scenes on one page — a Storybook-style gallery for design review.
// Only the scene nearest the viewport center plays (ScenePlaybackManager);
// scroll to hand playback from one to the next.

import { useDocumentMeta } from '../lib/useDocumentMeta';
import {
  SceneInquiryReply,
  SceneQualification,
  SceneScheduling,
  SceneFollowUp,
  ScenePipeline,
  SceneAgents,
  SceneApprovalGate,
} from '../components/scenes';

const GALLERY = [
  { name: '1 · SceneInquiryReply', note: 'Home hero (showcase slide 1)', C: SceneInquiryReply },
  { name: '2 · SceneQualification', note: 'Product — feature 02', C: SceneQualification },
  { name: '3 · SceneScheduling', note: 'Product — feature 03', C: SceneScheduling },
  { name: '4 · SceneFollowUp', note: 'Product — feature 04', C: SceneFollowUp },
  { name: '5 · ScenePipeline', note: 'Product — feature 05', C: ScenePipeline },
  { name: '6 · SceneAgents', note: 'AI features — hero', C: SceneAgents },
  { name: '7 · SceneApprovalGate', note: 'AI features + compliance bands', C: SceneApprovalGate },
];

export default function DevScenes() {
  useDocumentMeta({
    title: 'Product scenes — dev preview',
    robots: 'noindex, nofollow',
  });

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="container max-w-5xl">
        <h1 className="font-heading text-3xl text-charcoal">Product scenes — dev preview</h1>
        <p className="mt-2 text-slate">
          All seven self-playing vignettes. Only the scene nearest the viewport center runs; side-by-side
          scenes take turns (~9s). Narrow column at the end checks the 340px mobile rendering.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {GALLERY.map(({ name, note, C }) => (
            <div key={name}>
              <h2 className="font-metric text-sm font-bold text-charcoal">{name}</h2>
              <p className="mb-3 text-xs text-warm-gray">{note}</p>
              <C />
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-metric text-sm font-bold text-charcoal">340px mobile check</h2>
        <div className="mt-3 w-[340px] max-w-full space-y-6">
          <SceneInquiryReply />
          <SceneScheduling />
          <SceneAgents />
        </div>
      </div>
    </div>
  );
}
