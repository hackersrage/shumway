/**
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Class: DropShadowFilter
module Shumway.AVM2.AS.flash.filters {

  import assert = Shumway.Debug.assert;
  import Rectangle = flash.geom.Rectangle;

  export class DropShadowFilter extends flash.filters.BitmapFilter {

    // Called whenever the class is initialized.
    static classInitializer: any = null;

    // Called whenever an instance of the class is initialized.
    static initializer: any = null;

    // List of static symbols to link.
    static classSymbols: string [] = null; // [];

    // List of instance symbols to link.
    static instanceSymbols: string [] = null;

    public static FromUntyped(obj: any) {
      // obj.colors is an array of RGBA colors.
      // Here it contains exactly one color object, which maps to color and alpha.
      release || assert(obj.colors && obj.colors.length === 1, "colors must be Array of length 1");
      var color: number = obj.colors[0] >>> 8;
      var alpha: number = (obj.colors[0] & 0xff) / 0xff;
      // obj.angle is represented in radians, the api needs degrees
      var angle: number = obj.angle * 180 / Math.PI;
      // obj.compositeSource maps to !hideObject
      var hideObject: boolean = !obj.compositeSource;
      return new DropShadowFilter(
        obj.distance,
        angle,
        color,
        alpha,
        obj.blurX,
        obj.blurY,
        obj.strength,
        obj.quality,
        obj.inner,
        obj.knockout,
        hideObject
      );
    }

    constructor (distance: number = 4, angle: number = 45, color: number /*uint*/ = 0, alpha: number = 1, blurX: number = 4, blurY: number = 4, strength: number = 1, quality: number /*int*/ = 1, inner: boolean = false, knockout: boolean = false, hideObject: boolean = false) {
      false && super();
      this.distance = distance;
      this.angle = angle;
      this.color = color;
      this.alpha = alpha;
      this.blurX = blurX;
      this.blurY = blurY;
      this.strength = strength;
      this.quality = quality;
      this.inner = inner;
      this.knockout = knockout;
      this.hideObject = hideObject;
    }

    _updateFilterBounds(bounds: Rectangle) {
      if (!this.inner) {
        BitmapFilter._updateBlurBounds(bounds, this._blurX, this._blurY, this._quality);
        if (this._distance !== 0) {
          var a: number = this._angle * Math.PI / 180;
          bounds.x += Math.floor(Math.cos(a) * this._distance);
          bounds.y += Math.floor(Math.sin(a) * this._distance);
          if (bounds.left > 0) { bounds.left = 0; }
          if (bounds.top > 0) { bounds.top = 0; }
        }
      }
    }

    _serialize(message) {
      message.ensureAdditionalCapacity(48);
      message.writeIntUnsafe(0);
      message.writeFloatUnsafe(this._alpha);
      message.writeFloatUnsafe(this._angle);
      message.writeFloatUnsafe(this._blurX);
      message.writeFloatUnsafe(this._blurY);
      message.writeIntUnsafe(this._color);
      message.writeFloatUnsafe(this._distance);
      message.writeIntUnsafe(this._hideObject);
      message.writeIntUnsafe(this._inner);
      message.writeIntUnsafe(this._knockout);
      message.writeIntUnsafe(this._quality);
      message.writeFloatUnsafe(this._strength);
    }

    // JS -> AS Bindings

    // AS -> JS Bindings

    private _distance: number;
    private _angle: number;
    private _color: number /*uint*/;
    private _alpha: number;
    private _blurX: number;
    private _blurY: number;
    private _hideObject: boolean;
    private _inner: boolean;
    private _knockout: boolean;
    private _quality: number /*int*/;
    private _strength: number;

    get distance(): number {
      return this._distance;
    }
    set distance(value: number) {
      this._distance = +value;
    }

    get angle(): number {
      return this._angle;
    }
    set angle(value: number) {
      this._angle = +value % 360;
    }

    get color(): number /*uint*/ {
      return this._color;
    }
    set color(value: number /*uint*/) {
      this._color = (value >>> 0) & 0xffffff;
    }

    get alpha(): number {
      return this._alpha;
    }
    set alpha(value: number) {
      this._alpha = NumberUtilities.clamp(+value, 0, 1);
    }

    get blurX(): number {
      return this._blurX;
    }
    set blurX(value: number) {
      this._blurX = NumberUtilities.clamp(+value, 0, 255);
    }

    get blurY(): number {
      return this._blurY;
    }

    set blurY(value: number) {
      this._blurY = NumberUtilities.clamp(+value, 0, 255);
    }

    get hideObject(): boolean {
      return this._hideObject;
    }
    set hideObject(value: boolean) {
      this._hideObject = !!value;
    }

    get inner(): boolean {
      return this._inner;
    }
    set inner(value: boolean) {
      this._inner = !!value;
    }

    get knockout(): boolean {
      return this._knockout;
    }
    set knockout(value: boolean) {
      this._knockout = !!value;
    }

    get quality(): number /*int*/ {
      return this._quality;
    }

    set quality(value: number /*int*/) {
      this._quality = NumberUtilities.clamp(value | 0, 0, 15);
    }

    get strength(): number {
      return this._strength;
    }
    set strength(value: number) {
      this._strength = NumberUtilities.clamp(+value, 0, 255);
    }

    clone(): BitmapFilter {
      return new DropShadowFilter(
        this._distance,
        this._angle,
        this._color,
        this._alpha,
        this._blurX,
        this._blurY,
        this._strength,
        this._quality,
        this._inner,
        this._knockout,
        this._hideObject
      );
    }
  }
}
