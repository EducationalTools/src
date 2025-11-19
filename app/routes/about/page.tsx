import { useExperimentalFeatures } from "@/lib/state";

export default function AboutPage() {
  const experimentalFeaturesEnabled = useExperimentalFeatures(
    (state) => state.enabled,
  );

  return (
    <div className="prose dark:prose-invert p-4 mx-auto">
      <h1>About</h1>
      <p>
        I created EduTools to practice my web development skills by building
        useful tools that can be used for education and other stuff.
      </p>
      {experimentalFeaturesEnabled && (
        <>
          <p>
            But if you turn on experimental features, it become an overkill
            unblocked gmaes site
          </p>
          <p>
            So, EduTools was created as the successor of CHSUnblocked which has
            since been taken down due to... issues with where it was being
            hosted
          </p>
        </>
      )}
    </div>
  );
}
