import { education, experience, site, type Project } from "@/content/site";
import { absoluteUrl, sameAs } from "./seo";

const PERSON_ID = absoluteUrl("/#person");
const WEBSITE_ID = absoluteUrl("/#website");

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    givenName: site.firstName,
    familyName: site.name.split(" ").slice(1).join(" "),
    jobTitle: site.role,
    description: site.summary,
    url: absoluteUrl("/"),
    image: absoluteUrl("/portrait.webp"),
    email: `mailto:${site.email}`,
    telephone: site.phoneHref,
    address: { "@type": "PostalAddress", addressLocality: "Herat", addressCountry: "AF" },
    worksFor: { "@type": "Organization", name: experience[0].company },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Herat University" },
    knowsAbout: [
      "Node.js",
      "NestJS",
      "GraphQL",
      "REST APIs",
      "TypeORM",
      "Prisma",
      "Mongoose",
      "SQL",
      "NoSQL",
      "Redis",
      "Mediasoup",
      "WebRTC",
      "Docker",
      "Nginx",
      "Linux",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.name,
    description: site.summary,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, k) => ({
      "@type": "ListItem",
      position: k + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function profilePageSchema(path: string, name: string) {
  return {
    "@type": "ProfilePage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

export function webPageSchema(path: string, name: string, description: string) {
  return {
    "@type": "WebPage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
  };
}

export function caseStudySchema(p: Project) {
  return {
    "@type": "Article",
    "@id": absoluteUrl(`/${p.slug}`),
    url: absoluteUrl(`/${p.slug}`),
    headline: p.headline,
    name: `${p.title} at ${p.company}`,
    description: p.blurb,
    image: absoluteUrl(`/${p.slug}/opengraph-image`),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    keywords: p.stack.join(", "),
    about: { "@type": "Organization", name: p.company },
    inLanguage: "en",
  };
}

export function collectionSchema(path: string, name: string, projects: Project[]) {
  return {
    "@type": "CollectionPage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, k) => ({
        "@type": "ListItem",
        position: k + 1,
        url: absoluteUrl(`/${p.slug}`),
        name: p.title,
      })),
    },
  };
}

export function educationCredential() {
  return {
    "@type": "EducationalOccupationalCredential",
    name: "Computer Science",
    credentialCategory: "degree",
    recognizedBy: { "@type": "CollegeOrUniversity", name: "Herat University" },
    description: `${education.text} ${education.period}.`,
  };
}
