import { useExperimentalFeatures } from "@/lib/state";
import type { Route } from "./+types/page";
import { data } from "react-router";
import { isExperimentalFeaturesEnabled } from "@/lib/experimental-check";

export async function clientLoader() {
  if (!isExperimentalFeaturesEnabled()) {
    throw data(null, { status: 404 });
  }
}

export default function PrivacyPage() {
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled,
  );

  return (
    <div className="prose dark:prose-invert p-4 mx-auto">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section>
        <h2>Analytics and Data Collection</h2>
        <p>
          We use PostHog for analytics to understand how our service is used and
          to improve user experience. PostHog collects and processes certain
          information about your interactions with our platform.
        </p>
        <p>
          User data is stored in PostHog, including but not limited to usage
          patterns, feature interactions, and technical information about your
          device and browser. This data helps us improve our services and
          provide a better user experience.
        </p>
      </section>

      <section>
        <h2>Third-Party Authentication</h2>
        <p>
          When you sign in using third-party services such as Google or GitHub,
          these services may collect and process your data according to their
          own privacy policies. By using these authentication methods, you
          acknowledge that:
        </p>
        <ul>
          <li>
            These third-party services have access to certain information you
            provide during authentication
          </li>
          <li>
            Their data collection and processing practices are governed by their
            respective privacy policies
          </li>
          <li>
            We recommend reviewing the privacy policies of these services before
            using them to sign in
          </li>
        </ul>
      </section>

      {experimentalFeatures && (
        <section>
          <h2>Gmaes and Third-Party Content</h2>
          <p>
            Our platform includes access to various gmaes that may have their
            own privacy policies and data collection practices. These gmaes may
            collect and process your data independently according to their own
            terms and privacy policies.
          </p>
          <p>
            We are not responsible for the privacy practices of these
            third-party gmaes. We encourage you to review the privacy policies
            of any gmaes you interact with to understand how they handle your
            data.
          </p>
        </section>
      )}

      <section>
        <h2>Your Rights and Data Deletion</h2>
        <p>
          You have the right to delete your account and all data associated with
          it at any time. You can do this by accessing your account settings and
          selecting the account deletion option.
        </p>
        <p>
          When you delete your account, we will remove your personal data from
          our systems. However, please note that:
        </p>
        <ul>
          <li>
            Data that has been shared with third-party services (such as PostHog
            or authentication providers) may be subject to their own data
            retention policies
          </li>
          {experimentalFeatures && (
            <li>
              Data collected by third-party gmaes will be governed by their
              respective privacy policies
            </li>
          )}
        </ul>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our data
          practices, please contact us at{" "}
          <a href="mailto:edutools@ftml.net">edutools@ftml.net</a>
        </p>
      </section>
    </div>
  );
}
