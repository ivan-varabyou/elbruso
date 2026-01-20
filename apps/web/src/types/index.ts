export type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  header: {
    nav: {
      home: string;
      products: string;
      pricing: string;
      blog: string;
      contact: string;
    };
    actions: {
      signIn: string;
      requestDemo: string;
    };
    logo: {
      elbruso: string;
      technologies: string;
    };
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    button: {
      audit: string;
      case: string;
    };
    metrics: {
      validated: string;
      validatedValue: string;
      organizations: string;
      organizationsValue: string;
    };
    panel: {
      title: string;
      status: string;
      chartTitle: string;
      chartLabel: string;
      score: string;
      scoreValue: string;
      auditors: string;
      auditorsValue: string;
      prediction: string;
      stability: string;
      passed: string;
    };
  };
  brands: {
    title: string;
    names: string[];
  };
  productsShowcase: {
    title: string;
    subtitle: string;
    coreCapabilities: string;
    buttons: {
      deepDive: string;
      technicalSpecs: string;
    };
    auditStatus: string;
    dataLinked: string;
    usps: Array<{
      id: string;
      label: string;
      title: string;
      description: string;
      features: string[];
    }>;
  };
  footer: {
    description: string;
    columns: {
      products: {
        title: string;
        links: Array<{ label: string; href: string }>;
      };
      company: {
        title: string;
        links: Array<{ label: string; href: string }>;
      };
      resources: {
        title: string;
        links: Array<{ label: string; href: string }>;
      };
      legal: {
        title: string;
        links: Array<{ label: string; href: string }>;
      };
    };
    copyright: string;
  };
};
