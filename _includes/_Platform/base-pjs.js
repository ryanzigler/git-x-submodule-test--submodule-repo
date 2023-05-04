/* eslint-disable prefer-rest-params */
export const platform = "Foo";
import { tag as moduleName } from "oli.meta";

export const log = function () {
  return PJS.log(`[${moduleName}]`, ...arguments);
};

export const error = function () {
  return PJS.error(moduleName, ...arguments);
};

export const waitForUtils = (callback) => {
  onInitialized(() => {
    callback(window.foo.get("utils"));
  });
};

export const onInitialized = (callback) => {
  (window.foo.initialized && callback()) ||
    window.foo.push({
      type: "addListener",
      filter: { type: "lifecycle", name: "initialized" },
      handler: callback,
    });
};

export const onActivated = (callback) => {
  window.foo.push({
    type: "addListener",
    filter: { type: "lifecycle", name: "activated" },
    handler: callback,
  });
};

export const onCampaignDecided = (callback) => {
  window.foo.push({
    type: "addListener",
    filter: { type: "lifecycle", name: "campaignDecided" },
    handler: (event) => {
      callback(event.data);
    },
  });
};

export const onTrackEvent = (callback) => {
  window.foo.push({
    type: "addListener",
    filter: { type: "analytics", name: "trackEvent" },
    handler: (event) => {
      event.data.id = event.data.id || event.data.apiName; // This is to make the output more consistent between platforms
      callback(event.data);
    },
  });
};

export const onTrackActivation = (callback) => {
  onCampaignDecided((data) => {
    const eventDecision = data.decision;
    const { isCampaignHoldback } = eventDecision;
    const { experimentId } = eventDecision;
    const { variationId } = eventDecision;

    if (!isCampaignHoldback && experimentId && variationId) {
      // Note: There may be multiple experiments in the campaign if this is a p13n campaign versus a standard experiment.
      const fooExperiment = data.campaign.experiments.find(
        (experiment) => experiment.id === experimentId
      );
      const { variations } = fooExperiment;

      const experiment = {
        name: fooExperiment.name,
        id: fooExperiment.id,
      };

      for (let i = 0; i < variations.length; i++) {
        const fooVariation = variations[i];
        if (variationId === fooVariation.id) {
          const variation = {
            name: fooVariation.name,
            id: fooVariation.id,
            tag: `v${i}`,
          };
          return callback(experiment, variation);
        }
      }
    }
  });
};

export const onPageActivated = (callback, pageId) => {
  window.foo.push({
    type: "addListener",
    filter: { type: "lifecycle", name: "pageActivated" },
    handler: (event) => {
      if (!pageId || event.data.page.id === String(pageId))
        callback(event.data);
    },
  });
};

export const onPageDeactivated = (callback, pageId) => {
  window.foo.push({
    type: "addListener",
    filter: { type: "lifecycle", name: "pageDeactivated" },
    handler: (event) => {
      if (!pageId || event.data.page.id === String(pageId))
        callback(event.data);
    },
  });
};

export const onActionApplied = (callback, campaignId) => {
  window.foo.push({
    type: "addListener",
    filter: { type: "lifecycle", name: "pageActivated" },
    handler: (event) => {
      if (!campaignId || event.data.campaignId === String(campaignId))
        callback(event.data);
    },
  });
};

export const activate = () => window.foo.push({ type: "activate" });

export { sendEvent } from "cromedics/foo/events";

export {
  setAttributes,
  initializeAttributes,
  setDefaultAttributes,
} from "cromedics/foo/attributes";

export {
  activatePage,
  deactivatePage,
  pageIsActive,
} from "cromedics/foo/pages";
